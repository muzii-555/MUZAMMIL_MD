const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  jidNormalizedUser,
  getContentType,
  proto,
  generateForwardMessageContent,
  generateWAMessageFromContent,
  jidDecode,
  fetchLatestBaileysVersion,
  Browsers,
  downloadContentFromMessage
} = require('@whiskeysockets/baileys');

const P = require('pino');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { File } = require('megajs');
const FileType = require('file-type');
const os = require('os');
const util = require('util');
const express = require('express');
const config = require('./config');

const { getBuffer, getGroupAdmins, runtime, sleep, fetchJson } = require('./lib/functions');
const { saveMessage, AntiDelete } = require('./lib');
const GroupEvents = require('./lib/groupevents');
const { sms } = require('./lib');

const prefix = config.PREFIX;
const ownerNumber = [config.OWNER_NUMBER || '923293152414'];

// Temporary directory for caching
const tempDir = path.join(os.tmpdir(), 'cache-temp');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

const clearTempDir = () => {
  fs.readdir(tempDir, (err, files) => {
    if (err) return;
    for (const file of files) {
      fs.unlink(path.join(tempDir, file), () => {});
    }
  });
};
setInterval(clearTempDir, 5 * 60 * 1000);

// Session download from Mega if SESSION_ID is provided
if (!fs.existsSync('./sessions/creds.json')) {
  if (!config.SESSION_ID) {
    console.log('Please add your session to SESSION_ID env !!');
    process.exit(0);
  }
  const sessdata = config.SESSION_ID.replace('FAIZAN-MD~', '');
  const filer = File.fromURL(`https://mega.nz/file/${sessdata}`);
  filer.download((err, data) => {
    if (err) throw err;
    fs.writeFile('./sessions/creds.json', data, () => {
      console.log('SESSION DOWNLOADED ✅');
    });
  });
}

// Express server
const app = express();
const port = process.env.PORT || 9090;
app.get('/', (req, res) => res.send('MUZAMMIL-MD-V2 STARTED ✅'));
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));

// Helper: get media size
async function getSizeMedia(buffer) {
  return buffer.length;
}

// Main connection function
async function connectToWA() {
  console.log('CONNECTING TO WHATSAPP ⏳️...');
  const { state, saveCreds } = await useMultiFileAuthState('./sessions/');
  const { version } = await fetchLatestBaileysVersion();

  const conn = makeWASocket({
    logger: P({ level: 'silent' }),
    printQRInTerminal: false,
    browser: Browsers.macOS('Firefox'),
    syncFullHistory: true,
    auth: state,
    version
  });

  // Track if we already sent owner message to avoid duplicates on reconnect
  let ownerMessageSent = false;

  conn.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      if (lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut) {
        connectToWA();
      }
    } else if (connection === 'open') {
      console.log('🧬 Installing Plugins');
      const pluginPath = path.join(__dirname, 'plugins');
      fs.readdirSync(pluginPath).forEach((plugin) => {
        if (path.extname(plugin).toLowerCase() === '.js') {
          require(path.join(pluginPath, plugin));
        }
      });
      console.log('PLUGINS INSTALLED SUCCESSFUL ✅');
      console.log('MUZAMMIL-MD-V2 CONNECTED TO WHATSAPP ✅');

      // Startup message to bot's own number (existing)
      const startupMsg = `*╭┈───────────────•*
  𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋-𝐌𝐃-𝐕𝟐 𝐂𝐎𝐍𝐄𝐂𝐓𝐄𝐃
*╰┈───────────────•*
*╭┈───────────────•*
*│  ◦* *ᴘʀᴇғɪx: ${config.PREFIX}*
*│  ◦* *ᴏᴡɴᴇʀ-ɴᴀᴍᴇ: ➩ ${config.OWNER_NAME}*
*│  ◦* *ᴍᴏᴅᴇ: ➩ ${config.MODE}*
*│  ◦* *ᴏᴡɴᴇʀ-ɴᴜᴍᴇʀ: ➩ ${config.OWNER_NUMBER}*
*│  ◦* *ᴛʏᴘᴇ : ➩ ${config.PREFIX}menu* 
*╰┈───────────────•*
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴜᴢᴀᴍᴍɪʟ ᴛᴇᴄʜ*`;
      await conn.sendMessage(conn.user.id, {
        image: { url: 'https://files.catbox.moe/w1l8b0.jpg' },
        caption: startupMsg
      }).catch(e => console.error('Startup message error:', e));

      // Send inbox message to all owners (repo + channel)
      if (!ownerMessageSent) {
        const repoLink = config.REPO_LINK || 'https://github.com/MuzammilTech/MUZAMMIL-MD-V2';
        const channelLink = config.CHANNEL_LINK || 'https://whatsapp.com/channel/0029VaXXXXXXXX';
        const ownerMsg = `╭━━━━━━━━━━━━━━━━━━━━━━━┈⊛
┃ 🤖 *MUZAMMIL-MD-V2* 
┃ ✅ *Bot has been connected successfully!*
┃
┃ 📦 *Repository:* 
┃ ${repoLink}
┃
┃ 📢 *Channel:* 
┃ ${channelLink}
┃
┃ 👑 *Owner:* ${config.OWNER_NAME}
┃ 💬 *Prefix:* ${config.PREFIX}
╰━━━━━━━━━━━━━━━━━━━━━━━┈⊛`;

        for (const owner of ownerNumber) {
          const ownerJid = owner.includes('@') ? owner : `${owner}@s.whatsapp.net`;
          await conn.sendMessage(ownerJid, { text: ownerMsg }).catch(e =>
            console.error(`Failed to send start message to ${ownerJid}:`, e)
          );
        }
        ownerMessageSent = true;
      }
    }
  });

  conn.ev.on('creds.update', saveCreds);

  // Anti-delete handler
  conn.ev.on('messages.update', async (updates) => {
    for (const update of updates) {
      if (update.update.message === null) {
        await AntiDelete(conn, updates);
      }
    }
  });

  // Group events
  conn.ev.on('group-participants.update', (update) => GroupEvents(conn, update));

  // Main message handler
  conn.ev.on('messages.upsert', async (mek) => {
    let msg = mek.messages[0];
    if (!msg.message) return;
    msg.message = getContentType(msg.message) === 'ephemeralMessage'
      ? msg.message.ephemeralMessage.message
      : msg.message;

    // Read receipts
    if (config.READ_MESSAGE === 'true') {
      await conn.readMessages([msg.key]);
    }

    // Handle view once messages
    if (msg.message.viewOnceMessageV2) {
      msg.message = getContentType(msg.message) === 'ephemeralMessage'
        ? msg.message.ephemeralMessage.message
        : msg.message;
    }

    // Status broadcasts
    if (msg.key.remoteJid === 'status@broadcast') {
      if (config.AUTO_STATUS_SEEN === 'true') await conn.readMessages([msg.key]);
      if (config.AUTO_STATUS_REACT === 'true') {
        const botJid = conn.decodeJid(conn.user.id);
        const emojis = ['❤️', '💸', '😇', '🍂', '💥', '💯', '🔥', '💫', '💎', '💗', '🤍', '🖤', '👀', '🙌', '🙆', '🚩', '🥰', '💐', '😎', '🤎', '✅', '🫀', '🧡', '😁', '😄', '🌸', '🕊️', '🌷', '⛅', '🌟', '🗿', '🇵🇰', '💜', '💙', '🌝', '🖤', '💚'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        await conn.sendMessage(msg.key.remoteJid, {
          react: { text: randomEmoji, key: msg.key }
        }, { statusJidList: [msg.key.participant, botJid] });
      }
      if (config.AUTO_STATUS_REPLY === 'true') {
        const user = msg.key.participant;
        await conn.sendMessage(user, { text: config.AUTO_STATUS_MSG, react: { text: '💜', key: msg.key } }, { quoted: msg });
      }
    }

    await saveMessage(msg);
    const m = sms(conn, msg);
    const type = getContentType(msg.message);
    const from = msg.key.remoteJid;
    const body = (type === 'conversation') ? msg.message.conversation :
                 (type === 'extendedTextMessage') ? msg.message.extendedTextMessage.text :
                 (type === 'imageMessage' && msg.message.imageMessage.caption) ? msg.message.imageMessage.caption :
                 (type === 'videoMessage' && msg.message.videoMessage.caption) ? msg.message.videoMessage.caption : '';
    const isCmd = body.startsWith(prefix);
    const command = isCmd ? body.slice(prefix.length).trim().split(' ')[0].toLowerCase() : '';
    const args = body.trim().split(/ +/).slice(1);
    const text = args.join(' ');
    const isGroup = from.endsWith('@g.us');
    const sender = msg.key.fromMe ? (conn.user.id.split(':')[0] + '@s.whatsapp.net') : (msg.key.participant || msg.key.remoteJid);
    const senderNumber = sender.split('@')[0];
    const botNumber = conn.user.id.split(':')[0];
    const isMe = botNumber.includes(senderNumber);
    const isOwner = ownerNumber.includes(senderNumber) || isMe;
    const botNumber2 = await jidNormalizedUser(conn.user.id);
    const groupMetadata = isGroup ? await conn.groupMetadata(from).catch(() => null) : null;
    const groupName = groupMetadata?.subject || '';
    const participants = groupMetadata?.participants || [];
    const groupAdmins = getGroupAdmins(participants);
    const isBotAdmins = isGroup ? groupAdmins.includes(botNumber2) : false;
    const isAdmins = isGroup ? groupAdmins.includes(sender) : false;
    const isReact = !!m.message.reactionMessage;

    const reply = (teks) => conn.sendMessage(from, { text: teks }, { quoted: msg });

    // Auto-reactions
    if (!isReact && config.AUTO_REACT === 'true') {
      const reactions = ['🌼', '❤️', '💐', '🔥', '🏵️', '❄️', '🧊', '🐳', '💥', '🥀', '❤‍🔥', '🥹', '😩', '🫣', '🤭', '👻', '👾', '🫶', '😻', '🙌', '🫂', '🫀', '👩‍🦰', '🧑‍🦰', '👩‍⚕️', '🧑‍⚕️', '🧕', '👩‍🏫', '👨‍💻', '👰‍♀', '🦹🏻‍♀️', '🧟‍♀️', '🧟', '🧞‍♀️', '🧞', '🙅‍♀️', '💁‍♂️', '💁‍♀️', '🙆‍♀️', '🙋‍♀️', '🤷', '🤷‍♀️', '🤦', '🤦‍♀️', '💇‍♀️', '💇', '💃', '🚶‍♀️', '🚶', '🧶', '🧤', '👑', '💍', '👝', '💼', '🎒', '🥽', '🐻', '🐼', '🐭', '🐣', '🪿', '🦆', '🦊', '🦋', '🦄', '🪼', '🐋', '🐳', '🦈', '🐍', '🕊️', '🦦', '🦚', '🌱', '🍃', '🎍', '🌿', '☘️', '🍀', '🍁', '🪺', '🍄', '🍄‍🟫', '🪸', '🪨', '🌺', '🪷', '🪻', '🥀', '🌹', '🌷', '💐', '🌾', '🌸', '🌼', '🌻', '🌝', '🌚', '🌕', '🌎', '💫', '🔥', '☃️', '❄️', '🌨️', '🫧', '🍟', '🍫', '🧃', '🧊', '🪀', '🤿', '🏆', '🥇', '🥈', '🥉', '🎗️', '🤹', '🤹‍♀️', '🎧', '🎤', '🥁', '🧩', '🎯', '🚀', '🚁', '🗿', '🎙️', '⌛', '⏳', '💸', '💎', '⚙️', '⛓️', '🔪', '🧸', '🎀', '🪄', '🎈', '🎁', '🎉', '🏮', '🪩', '📩', '💌', '📤', '📦', '📊', '📈', '📑', '📉', '📂', '🔖', '🧷', '📌', '📝', '🔏', '🔐', '🩷', '❤️', '🧡', '💛', '💚', '🩵', '💙', '💜', '🖤', '🩶', '🤍', '🤎', '❤‍🔥', '❤‍🩹', '💗', '💖', '💘', '💝', '❌', '✅', '🔰', '〽️', '🌐', '🌀', '⤴️', '⤵️', '🔴', '🟢', '🟡', '🟠', '🔵', '🟣', '⚫', '⚪', '🟤', '🔇', '🔊', '📢', '🔕', '♥️', '🕐', '🚩', '🇵🇰'];
      const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
      m.react(randomReaction);
    }
    if (!isReact && config.CUSTOM_REACT === 'true') {
      const reactions = (config.CUSTOM_REACT_EMOJIS || '🥲,😂,👍🏻,🙂,😔').split(',');
      const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
      m.react(randomReaction);
    }

    // Mode & sudo checks
    const ownerFile = JSON.parse(fs.readFileSync('./lib/sudo.json', 'utf-8'));
    const ownerNumberFormatted = `${config.OWNER_NUMBER}@s.whatsapp.net`;
    const isFileOwner = ownerFile.includes(sender);
    const isRealOwner = sender === ownerNumberFormatted || isMe || isFileOwner;
    if (!isRealOwner && config.MODE === 'private') return;
    if (!isRealOwner && isGroup && config.MODE === 'inbox') return;
    if (!isRealOwner && !isGroup && config.MODE === 'groups') return;

    // Execute commands
    const events = require('./command');
    if (isCmd) {
      const cmd = events.commands.find(cmd => cmd.pattern === command) ||
                  events.commands.find(cmd => cmd.alias?.includes(command));
      if (cmd) {
        if (cmd.react) conn.sendMessage(from, { react: { text: cmd.react, key: msg.key } });
        try {
          await cmd.function(conn, msg, m, {
            from, quoted: null, body, isCmd, command, args, q: text, text,
            isGroup, sender, senderNumber, botNumber2, botNumber,
            pushname: msg.pushName, isMe, isOwner, isCreator: isRealOwner,
            groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
          });
        } catch (e) {
          console.error('[PLUGIN ERROR]', e);
        }
      }
    }
  });

  // ==================== UTILITY FUNCTIONS ====================
  conn.decodeJid = (jid) => {
    if (!jid) return jid;
    if (/:\d+@/gi.test(jid)) {
      const decode = jidDecode(jid) || {};
      return (decode.user && decode.server && `${decode.user}@${decode.server}`) || jid;
    }
    return jid;
  };

  conn.copyNForward = async (jid, message, forceForward = false, options = {}) => {
    let vtype;
    if (options.readViewOnce) {
      message.message = message.message?.ephemeralMessage?.message || message.message;
      vtype = Object.keys(message.message.viewOnceMessage.message)[0];
      delete message.message.viewOnceMessage.message[vtype].viewOnce;
      message.message = { ...message.message.viewOnceMessage.message };
    }
    const mtype = Object.keys(message.message)[0];
    const content = await generateForwardMessageContent(message, forceForward);
    const ctype = Object.keys(content)[0];
    let context = {};
    if (mtype !== 'conversation') context = message.message[mtype].contextInfo;
    content[ctype].contextInfo = { ...context, ...content[ctype].contextInfo };
    const waMessage = await generateWAMessageFromContent(jid, content, options);
    await conn.relayMessage(jid, waMessage.message, { messageId: waMessage.key.id });
    return waMessage;
  };

  conn.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
    const quoted = message.msg || message;
    const mime = quoted.mimetype || '';
    const messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
    const stream = await downloadContentFromMessage(quoted, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
    const type = await FileType.fromBuffer(buffer);
    const trueFileName = attachExtension ? `${filename}.${type.ext}` : filename;
    fs.writeFileSync(trueFileName, buffer);
    return trueFileName;
  };

  conn.downloadMediaMessage = async (message) => {
    const mime = (message.msg || message).mimetype || '';
    const messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
    const stream = await downloadContentFromMessage(message, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
    return buffer;
  };

  conn.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
    const res = await axios.head(url);
    const mime = res.headers['content-type'];
    const buffer = await getBuffer(url);
    if (mime.split('/')[1] === 'gif') {
      return conn.sendMessage(jid, { video: buffer, caption, gifPlayback: true, ...options }, { quoted });
    }
    if (mime === 'application/pdf') {
      return conn.sendMessage(jid, { document: buffer, mimetype: 'application/pdf', caption, ...options }, { quoted });
    }
    if (mime.startsWith('image/')) {
      return conn.sendMessage(jid, { image: buffer, caption, ...options }, { quoted });
    }
    if (mime.startsWith('video/')) {
      return conn.sendMessage(jid, { video: buffer, caption, mimetype: 'video/mp4', ...options }, { quoted });
    }
    if (mime.startsWith('audio/')) {
      return conn.sendMessage(jid, { audio: buffer, caption, mimetype: 'audio/mpeg', ...options }, { quoted });
    }
  };

  conn.cMod = (jid, copy, text = '', sender = conn.user.id, options = {}) => {
    let mtype = Object.keys(copy.message)[0];
    let isEphemeral = mtype === 'ephemeralMessage';
    if (isEphemeral) mtype = Object.keys(copy.message.ephemeralMessage.message)[0];
    let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message;
    let content = msg[mtype];
    if (typeof content === 'string') msg[mtype] = text || content;
    else if (content.caption) content.caption = text || content.caption;
    else if (content.text) content.text = text || content.text;
    if (typeof content !== 'string') msg[mtype] = { ...content, ...options };
    if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant;
    if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid;
    copy.key.remoteJid = jid;
    copy.key.fromMe = sender === conn.user.id;
    return proto.WebMessageInfo.fromObject(copy);
  };

  conn.getFile = async (PATH, save) => {
    let data = Buffer.isBuffer(PATH) ? PATH :
               /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split(',')[1], 'base64') :
               /^https?:\/\//.test(PATH) ? await getBuffer(PATH) :
               fs.existsSync(PATH) ? fs.readFileSync(PATH) : Buffer.alloc(0);
    const type = (await FileType.fromBuffer(data)) || { mime: 'application/octet-stream', ext: '.bin' };
    const filename = path.join(__dirname, `${Date.now()}.${type.ext}`);
    if (data && save) fs.promises.writeFile(filename, data);
    return { filename, size: await getSizeMedia(data), ...type, data };
  };

  conn.sendFile = async (jid, PATH, fileName, quoted = {}, options = {}) => {
    const { filename, mime, data } = await conn.getFile(PATH, true);
    let type = '', mimetype = mime, pathFile = filename;
    if (options.asDocument) type = 'document';
    if (options.asSticker || /webp/.test(mime)) {
      const { writeExif } = require('./exif.js');
      const media = { mimetype: mime, data };
      pathFile = await writeExif(media, { packname: config.packname, author: config.author, categories: options.categories || [] });
      await fs.promises.unlink(filename);
      type = 'sticker';
      mimetype = 'image/webp';
    } else if (/image/.test(mime)) type = 'image';
    else if (/video/.test(mime)) type = 'video';
    else if (/audio/.test(mime)) type = 'audio';
    else type = 'document';
    await conn.sendMessage(jid, { [type]: { url: pathFile }, mimetype, fileName, ...options }, { quoted });
    return fs.promises.unlink(pathFile);
  };

  conn.parseMention = async (text) => [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => `${v[1]}@s.whatsapp.net`);

  conn.sendTextWithMentions = async (jid, text, quoted, options = {}) =>
    conn.sendMessage(jid, { text, contextInfo: { mentionedJid: await conn.parseMention(text) }, ...options }, { quoted });

  conn.sendImage = async (jid, path, caption = '', quoted = '', options) => {
    const buffer = Buffer.isBuffer(path) ? path :
                   /^https?:\/\//.test(path) ? await getBuffer(path) :
                   fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
    return conn.sendMessage(jid, { image: buffer, caption, ...options }, { quoted });
  };

  conn.sendText = (jid, text, quoted = '', options) => conn.sendMessage(jid, { text, ...options }, { quoted });

  conn.sendContact = async (jid, kon, quoted = '', opts = {}) => {
    const list = [];
    for (const i of kon) {
      list.push({
        displayName: await conn.getName(`${i}@s.whatsapp.net`),
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await conn.getName(`${i}@s.whatsapp.net`)}\nFN:${config.OWNER_NAME}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Click here to chat\nitem2.EMAIL;type=INTERNET:${config.email}\nitem2.X-ABLabel:GitHub\nitem3.URL:https://github.com/${config.github}/muzammil-md-v2\nitem3.X-ABLabel:GitHub\nitem4.ADR:;;${config.location};;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
      });
    }
    conn.sendMessage(jid, { contacts: { displayName: `${list.length} Contact`, contacts: list }, ...opts }, { quoted });
  };

  conn.setStatus = (status) => {
    conn.query({
      tag: 'iq',
      attrs: { to: '@s.whatsapp.net', type: 'set', xmlns: 'status' },
      content: [{ tag: 'status', attrs: {}, content: Buffer.from(status, 'utf-8') }]
    });
    return status;
  };

  conn.serializeM = (mek) => sms(conn, mek);
}

// Start the bot after 4 seconds
setTimeout(() => {
  connectToWA();
}, 4000);
