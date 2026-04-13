const config = require('../config')
const { cmd, commands } = require('../command');

cmd({
    pattern: "list",
    alias: ["listcmd","commands"],
    desc: "menu the bot",
    category: "menu",
    react: "⚡",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📥 *DOWNLOAD CMD*
*│*
*│* 👑 .play ➔ Download Audio from yt
*│* 👑 .song ➔ Download song from yt
*│* 👑 .apk ➔ Download apk from playstore
*│* 👑 .video ➔ Download video from yt
*│* 👑 .fb ➔ Download video from fb
*│* 👑 .tk ➔ Download video from tiktok
*│* 👑 .ig ➔ Download video from ig
*│* 👑 .gdrive ➔ Download drive files
*│* 👑 .twitter ➔ Download video from Twitter
*│* 👑 .img ➔ Download image
*│* 👑 .darama ➔ Download full episode video
*│* 👑 .play2 ➔ Download Audio from yt
*│* 👑 .video2 ➔ Download video from yt
*│* 👑 .baiscope ➔ Download video from baiscope
*│* 👑 .mfire ➔ Download mediafire files
*│*
*│* 🎭 *ANIME CMD*
*│*
*│* 👑 .yts ➔ Serch videos from yt
*│* 👑 .king ➔ get king about
*│* 👑 .dog ➔ get random dog imgs
*│* 👑 .anime ➔ get anime pics
*│* 👑 .animegirl ➔ get animegirl pics
*│* 👑 .loli ➔ get romantic anime pics
*│*
*│* ℹ️ *INFO CMD*
*│*
*│* 👑 .alive ➔ Check online or not
*│* 👑 .ping ➔ Check bot speed
*│* 👑 .menu ➔ MUZAMMIL main menu
*│* 👑 .menu2 ➔ MUZAMMIL main menu2
*│* 👑 .ai ➔ chat with ai bot
*│* 👑 .system ➔ check bot systems
*│* 👑 .owner ➔ get owner info
*│* 👑 .status ➔ check bot runtime
*│* 👑 .about ➔ get about bot
*│* 👑 .list ➔ get bot command list
*│* 👑 .script ➔ get bot repository
*│*
*│* 🔧 *OTHER CMD*
*│*
*│* 👑 .joke ➔ Get Rendom joke
*│* 👑 .fact ➔ Get Rendom fact
*│* 👑 .githubstalk ➔ Get github data any user
*│* 👑 .gpass ➔ Get a strong password
*│* 👑 .hack ➔ prank with friends
*│* 👑 .srepo ➔ serch repository
*│* 👑 .define ➔ serch any words
*│*
*│* 👥 *GROUP CMD*
*│*
*│* 👑 .mute ➔ Mute group
*│* 👑 .unmute ➔ Unmute group
*│* 👑 .left ➔ left group
*│* 👑 .jid ➔ group jid
*│* 👑 .remove ➔ remove member from group
*│* 👑 .delete ➔ remove sms from group
*│* 👑 .add ➔ add members in group
*│* 👑 .kick ➔ kick any user
*│* 👑 .kickall ➔ remove all members from group
*│* 👑 .setgoodbye ➔ set member leave sms
*│* 👑 .setwelcome ➔ set member welcome sms
*│* 👑 .promote ➔ make group admin
*│* 👑 .demote ➔ dissmis any admin
*│* 👑 .tagall ➔ mention group all members
*│* 👑 .getpic ➔ get group profile
*│* 👑 .invite ➔ get group invite link
*│* 👑 .revoke ➔ reset group link
*│* 👑 .joinrequests ➔ cheack group panding members
*│* 👑 .allreq ➔ add group panding members
*│* 👑 .lockgc ➔ lock group private
*│* 👑 .unlockgc ➔ unlock group all
*│* 👑 .leave ➔ left any group
*│* 👑 .updategname ➔ set group name
*│* 👑 .updategdesc ➔ set group description
*│* 👑 .joim ➔ join invite link
*│* 👑 .hidetag ➔ mention any user hide
*│* 👑 .ginfo ➔ get group information
*│* 👑 .disappear on ➔ on disappear sms in group
*│* 👑 .disappear off ➔ off disappear sms in group
*│* 👑 .senddm ➔ send disappear sms in group
*│* 👑 .disappear 7d 24h 90d ➔ set time to disappear sms
*│*
*│* 👑 *OWNER CMD*
*│*
*│* 👑 .update ➔ update bot velue
*│* 👑 .restart ➔ restart your bot
*│* 👑 .settings ➔ see bot settings
*│* 👑 .owner ➔ get owner number
*│* 👑 .repo ➔ get bot repository
*│* 👑 .system ➔ check bot systems
*│* 👑 .block ➔ block any user
*│* 👑 .unblock ➔ unblock any user
*│* 👑 .shutdown ➔ logout your bot
*│* 👑 .clearchats ➔ clearchats from ib
*│* 👑 .setpp ➔ update profile pic
*│* 👑 .broadcast ➔ creat broadcast
*│* 👑 .jid ➔ get jid any user
*│* 👑 .gjid ➔ get group jid
*│*
*│* 🔄 *CONVERT CMD*
*│*
*│* 👑 .sticker ➔ convert photo to sticker
*│* 👑 .tts ➔ change text to voice
*│* 👑 .trt ➔ change languages
*│*
*│* 📌 *${config.DESCRIPTION || 'MUZAMMIL-MD WhatsApp Bot'}*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/s3cve5.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363424043617436@newsletter',
                        newsletterName: 'MUZAMMIL-MD',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

        // Send audio
        await conn.sendMessage(from, {
            audio: { url: 'https://files.catbox.moe/ojgl79.mp3' },
            mimetype: 'audio/mp4',
            ptt: false
        }, { quoted: mek });
        
    } catch (e) {
        console.log(e);
        reply(`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*\n*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*\n*│*\n*│* ❌ *Error:* ${e}\n*│*\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`);
    }
});