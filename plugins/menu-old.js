const config = require('../config');
const { cmd } = require('../command');
const { runtime } = require('../lib/functions');
const os = require("os");
const path = require('path');
const axios = require('axios');
const fs = require('fs');

// Function to send voice with menu
async function sendMenuWithVoice(conn, from, mek, caption) {
    try {
        // Send menu image with caption
        await conn.sendMessage(
            from,
            {
                image: { url: config.MENU_IMAGE_URL },
                caption: caption,
                contextInfo: {
                    mentionedJid: [mek.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363403831162407@newsletter',
                        newsletterName: '𝙈𝙐𝙕𝘼𝙈𝙈𝙄𝙇_𝙈𝘿',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

        // Send single voice note for all menus
        const voicePath = path.join(__dirname, '../assets/voice.mp3');
        if (fs.existsSync(voicePath)) {
            await conn.sendMessage(from, {
                audio: fs.readFileSync(voicePath),
                mimetype: 'audio/mp4',
                ptt: true,
            }, { quoted: mek });
        } else {
            console.log('Voice file not found: voice.mp3');
        }
    } catch (e) {
        console.error('Error sending menu with voice:', e);
        throw e;
    }
}

cmd({
    pattern: "menu3",
    desc: "🔥 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 𝐁𝐎𝐓 𝐌𝐄𝐍𝐔 🔥",
    category: "menu3",
    react: "✨",
    filename: __filename
},
async (conn, mek, m, { from, sender, pushname, reply }) => {
    try {
        const dec = `╔═══════════════════════╗
   🌸 𝗠𝗨𝗭𝗔𝗠𝗠𝗜𝗟 𝗠𝗗 🌸
╚═══════════════════════╝

✦ 𝗕𝗢𝗧 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡 ✦
• 𝗡𝗮𝗺𝗲: ${config.BOT_NAME}
• 𝗢𝘄𝗻𝗲𝗿: ${config.OWNER_NAME}
• 𝗣𝗿𝗲𝗳𝗶𝘅: ${config.PREFIX}
• 𝗠𝗼𝗱𝗲: ${config.MODE}
• 𝗩𝗲𝗿𝘀𝗶𝗼𝗻: 3.0.0

✦ 𝗖𝗔𝗧𝗘𝗚𝗢𝗥𝗜𝗘𝗦 ✦
┌─────────────────
│ 📖 » Quran Menu
│ 🕌 » Prayer Time  
│ 🤖 » AI Commands
│ 🎴 » Anime World
│ 💞 » Reactions
│ 🔄 » Converter
│ 🎮 » Fun Games
│ 📥 » Downloader
│ ⚡ » Main Tools
│ 👥 » Group Tools
│ 📜 » All Commands
│ 👑 » Owner Panel
│ 🛠️ » Utilities
│ 🎨 » Logo Maker
│ 📦 » Repository
└─────────────────

╔═══════════════════════╗
   💫 𝗘𝗡𝗝𝗢𝗬 𝗧𝗛𝗘 𝗕𝗢𝗧 💫
╚═══════════════════════╝
${config.DESCRIPTION}`;

        await sendMenuWithVoice(conn, from, mek, dec);

    } catch (e) {
        console.error(e);
        reply(`❌ Error:\n${e}`);
    }
});

cmd({
    pattern: "logo",
    alias: ["logomenu"],
    desc: "🎨 Logo Menu",
    category: "menu",
    react: "🖌️",
    filename: __filename
}, 
async (conn, mek, m, { from, reply }) => {
    try {
        let dec = `╔═══════════════════════╗
   🎨 𝗟𝗢𝗚𝗢 𝗠𝗘𝗡𝗨 🎨
╚═══════════════════════╝

✦ 𝗟𝗢𝗚𝗢 𝗦𝗧𝗬𝗟𝗘𝗦 ✦
┌─────────────────
│ ✦ neonlight
│ ✦ blackpink
│ ✦ dragonball
│ ✦ 3dcomic
│ ✦ america
│ ✦ naruto
│ ✦ sadgirl
│ ✦ clouds
│ ✦ futuristic
│ ✦ 3dpaper
│ ✦ eraser
│ ✦ sunset
│ ✦ leaf
│ ✦ galaxy
│ ✦ sans
│ ✦ boom
│ ✦ hacker
│ ✦ devilwings
│ ✦ nigeria
│ ✦ bulb
│ ✦ angelwings
│ ✦ zodiac
│ ✦ luxury
│ ✦ paint
│ ✦ frozen
│ ✦ castle
│ ✦ tatoo
│ ✦ valorant
│ ✦ bear
│ ✦ typography
│ ✦ birthday
└─────────────────

╔═══════════════════════╗
   🎯 ${config.PREFIX}logo style text
╚═══════════════════════╝`;

        await sendMenuWithVoice(conn, from, mek, dec);

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

cmd({
    pattern: "reactions",
    desc: "💫 Reactions Menu",
    category: "menu",
    react: "😊",
    filename: __filename
}, 
async (conn, mek, m, { from, reply }) => {
    try {
        let dec = `╔═══════════════════════╗
   💫 𝗥𝗘𝗔𝗖𝗧𝗜𝗢𝗡𝗦 𝗠𝗘𝗡𝗨 💫
╚═══════════════════════╝

✦ 𝗥𝗘𝗔𝗖𝗧𝗜𝗢𝗡𝗦 ✦
┌─────────────────
│ ✦ bully @tag
│ ✦ cuddle @tag
│ ✦ cry @tag
│ ✦ hug @tag
│ ✦ awoo @tag
│ ✦ kiss @tag
│ ✦ lick @tag
│ ✦ pat @tag
│ ✦ smug @tag
│ ✦ bonk @tag
│ ✦ yeet @tag
│ ✦ blush @tag
│ ✦ smile @tag
│ ✦ wave @tag
│ ✦ highfive @tag
│ ✦ handhold @tag
│ ✦ nom @tag
│ ✦ bite @tag
│ ✦ glomp @tag
│ ✦ slap @tag
│ ✦ kill @tag
│ ✦ happy @tag
│ ✦ wink @tag
│ ✦ poke @tag
│ ✦ dance @tag
│ ✦ cringe @tag
└─────────────────

╔═══════════════════════╗
   🎭 𝗘𝘅𝗽𝗿𝗲𝘀𝘀 𝗬𝗼𝘂𝗿𝘀𝗲𝗹𝗳!
╚═══════════════════════╝`;

        await sendMenuWithVoice(conn, from, mek, dec);

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// Download Menu
cmd({
    pattern: "dlmenu",
    desc: "📥 Download Menu",
    category: "menu",
    react: "⬇️",
    filename: __filename
}, 
async (conn, mek, m, { from, reply }) => {
    try {
        let dec = `╔═══════════════════════╗
   📥 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗 𝗠𝗘𝗡𝗨 📥
╚═══════════════════════╝

✦ 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗦 ✦
┌─────────────────
│ ✦ facebook
│ ✦ mediafire
│ ✦ tiktok
│ ✦ twitter
│ ✦ Insta
│ ✦ apk
│ ✦ img
│ ✦ tt2
│ ✦ pins
│ ✦ apk2
│ ✦ fb2
│ ✦ pinterest 
│ ✦ spotify
│ ✦ play
│ ✦ play2
│ ✦ play3
│ ✦ play4
│ ✦ play5
│ ✦ play6
│ ✦ play7
│ ✦ play8
│ ✦ play9
│ ✦ play10
│ ✦ audio
│ ✦ video
│ ✦ video2
│ ✦ video3
│ ✦ video4
│ ✦ video5
│ ✦ video6
│ ✦ video7
│ ✦ video8
│ ✦ video9
│ ✦ video10
│ ✦ ytmp3
│ ✦ ytmp4
│ ✦ song
│ ✦ darama
│ ✦ gdrive
│ ✦ ssweb
│ ✦ tiks
└─────────────────

╔═══════════════════════╗
   💾 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱 𝗔𝗻𝘆𝘁𝗵𝗶𝗻𝗴!
╚═══════════════════════╝`;

        await sendMenuWithVoice(conn, from, mek, dec);

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// Group Menu
cmd({
    pattern: "groupmenu",
    desc: "👥 Group Menu",
    category: "menu",
    react: "💬",
    filename: __filename
}, 
async (conn, mek, m, { from, reply }) => {
    try {
        let dec = `╔═══════════════════════╗
   👥 𝗚𝗥𝗢𝗨𝗣 𝗠𝗘𝗡𝗨 👥
╚═══════════════════════╝

✦ 𝗚𝗥𝗢𝗨𝗣 𝗧𝗢𝗢𝗟𝗦 ✦
┌─────────────────
│ ✦ grouplink
│ ✦ kickall
│ ✦ kickall2
│ ✦ kickall3
│ ✦ add
│ ✦ remove
│ ✦ kick
│ ✦ promote 
│ ✦ demote
│ ✦ dismiss 
│ ✦ revoke
│ ✦ setgoodbye
│ ✦ setwelcome
│ ✦ delete 
│ ✦ getpic
│ ✦ ginfo
│ ✦ disappear on
│ ✦ disappear off
│ ✦ disappear 7D,24H
│ ✦ allreq
│ ✦ updategname
│ ✦ updategdesc
│ ✦ joinrequests
│ ✦ senddm
│ ✦ nikal
│ ✦ mute
│ ✦ unmute
│ ✦ lockgc
│ ✦ unlockgc
│ ✦ invite
│ ✦ tag
│ ✦ hidetag
│ ✦ tagall
│ ✦ tagadmins
└─────────────────

╔═══════════════════════╗
   🛡️ 𝗠𝗮𝗻𝗮𝗴𝗲 𝗚𝗿𝗼𝘂𝗽𝘀!
╚═══════════════════════╝`;

        await sendMenuWithVoice(conn, from, mek, dec);

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// Fun Menu
cmd({
    pattern: "funmenu",
    desc: "🎮 Fun Menu",
    category: "menu",
    react: "😄",
    filename: __filename
}, 
async (conn, mek, m, { from, reply }) => {
    try {
        let dec = `╔═══════════════════════╗
   🎮 𝗙𝗨𝗡 𝗠𝗘𝗡𝗨 🎮
╚═══════════════════════╝

✦ 𝗙𝗨𝗡 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦 ✦
┌─────────────────
│ ✦ shapar
│ ✦ rate
│ ✦ insult
│ ✦ hack
│ ✦ ship
│ ✦ character
│ ✦ pickup 
│ ✦ joke
│ ✦ hrt
│ ✦ hpy
│ ✦ syd
│ ✦ anger
│ ✦ shy
│ ✦ kiss
│ ✦ mon
│ ✦ cunfuzed
│ ✦ setpp
│ ✦ hand
│ ✦ nikal
│ ✦ hold
│ ✦ hug
│ ✦ hifi
│ ✦ poke
└─────────────────

╔═══════════════════════╗
   🎊 𝗛𝗮𝘃𝗲 𝗙𝘂𝗻!
╚═══════════════════════╝`;

        await sendMenuWithVoice(conn, from, mek, dec);

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// Other Menu
cmd({
    pattern: "othermenu",
    desc: "🛠️ Other Menu",
    category: "menu",
    react: "⚙️",
    filename: __filename
}, 
async (conn, mek, m, { from, reply }) => {
    try {
        let dec = `╔═══════════════════════╗
   🛠️ 𝗢𝗧𝗛𝗘𝗥 𝗠𝗘𝗡𝗨 🛠️
╚═══════════════════════╝

✦ 𝗢𝗧𝗛𝗘𝗥 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦 ✦
┌─────────────────
│ ✦ timenow
│ ✦ date
│ ✦ count
│ ✦ calculate
│ ✦ countx
│ ✦ flip
│ ✦ coinflip
│ ✦ rcolor
│ ✦ roll
│ ✦ fact
│ ✦ cpp
│ ✦ rw
│ ✦ pair
│ ✦ pair2
│ ✦ pair3
│ ✦ fancy
│ ✦ logo <text>
│ ✦ define
│ ✦ news
│ ✦ movie
│ ✦ weather
│ ✦ srepo
│ ✦ insult
│ ✦ save
│ ✦ wikipedia
│ ✦ gpass
│ ✦ githubstalk
│ ✦ yts
│ ✦ ytv
└─────────────────

╔═══════════════════════╗
   ⚡ 𝗨𝘀𝗲𝗳𝘂𝗹 𝗧𝗼𝗼𝗹𝘀!
╚═══════════════════════╝`;

        await sendMenuWithVoice(conn, from, mek, dec);

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// Main Menu
cmd({
    pattern: "mainmenu",
    desc: "⚡ Main Menu",
    category: "menu",
    react: "🏠",
    filename: __filename
}, 
async (conn, mek, m, { from, reply }) => {
    try {
        let dec = `╔═══════════════════════╗
   ⚡ 𝗠𝗔𝗜𝗡 𝗠𝗘𝗡𝗨 ⚡
╚═══════════════════════╝

✦ 𝗠𝗔𝗜𝗡 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦 ✦
┌─────────────────
│ ✦ ping
│ ✦ live 
│ ✦ alive
│ ✦ runtime
│ ✦ uptime 
│ ✦ repo
│ ✦ owner
│ ✦ menu
│ ✦ menu2
│ ✦ restart
└─────────────────

╔═══════════════════════╗
   🚀 𝗘𝘀𝘀𝗲𝗻𝘁𝗶𝗮𝗹 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀
╚═══════════════════════╝`;

        await sendMenuWithVoice(conn, from, mek, dec);

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// Owner Menu
cmd({
    pattern: "ownermenu",
    desc: "🔐 Owner Menu",
    category: "menu",
    react: "👑",
    filename: __filename
}, 
async (conn, mek, m, { from, reply }) => {
    try {
        let dec = `╔═══════════════════════╗
   👑 𝗢𝗪𝗡𝗘𝗥 𝗠𝗘𝗡𝗨 👑
╚═══════════════════════╝

✦ 𝗢𝗪𝗡𝗘𝗥 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦 ✦
┌─────────────────
│ ✦ owner
│ ✦ menu
│ ✦ menu2
│ ✦ listcmd
│ ✦ allmenu
│ ✦ repo
│ ✦ block
│ ✦ unblock
│ ✦ fullpp
│ ✦ setpp
│ ✦ restart
│ ✦ shutdown
│ ✦ updatecmd
│ ✦ alive
│ ✦ ping 
│ ✦ gjid
│ ✦ jid
└─────────────────

╔═══════════════════════╗
   ⚠️ 𝗢𝘄𝗻𝗲𝗿 𝗢𝗻𝗹𝘆!
╚═══════════════════════╝`;

        await sendMenuWithVoice(conn, from, mek, dec);

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// Convert Menu
cmd({
    pattern: "convertmenu",
    desc: "🔄 Convert Menu",
    category: "menu",
    react: "🔄",
    filename: __filename
}, 
async (conn, mek, m, { from, reply }) => {
    try {
        let dec = `╔═══════════════════════╗
   🔄 𝗖𝗢𝗡𝗩𝗘𝗥𝗧 𝗠𝗘𝗡𝗨 🔄
╚═══════════════════════╝

✦ 𝗖𝗢𝗡𝗩𝗘𝗥𝗧𝗘𝗥𝗦 ✦
┌─────────────────
│ ✦ sticker
│ ✦ sticker2
│ ✦ emojimix
│ ✦ fancy
│ ✦ take
│ ✦ tomp3
│ ✦ tts
│ ✦ trt
│ ✦ base64
│ ✦ unbase64
│ ✦ binary
│ ✦ dbinary
│ ✦ tinyurl
│ ✦ urldecode
│ ✦ urlencode
│ ✦ url
│ ✦ repeat 
│ ✦ ask
│ ✦ readmore
└─────────────────

╔═══════════════════════╗
   🛠️ 𝗖𝗼𝗻𝘃𝗲𝗿𝘁 𝗙𝗶𝗹𝗲𝘀!
╚═══════════════════════╝`;

        await sendMenuWithVoice(conn, from, mek, dec);

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// Anime Menu
cmd({
    pattern: "animemenu",
    desc: "🎌 Anime Menu",
    category: "menu",
    react: "🌸",
    filename: __filename
}, 
async (conn, mek, m, { from, reply }) => {
    try {
        let dec = `╔═══════════════════════╗
   🎌 𝗔𝗡𝗜𝗠𝗘 𝗠𝗘𝗡𝗨 🎌
╚═══════════════════════╝

✦ 𝗔𝗡𝗜𝗠𝗘 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦 ✦
┌─────────────────
│ ✦ fack
│ ✦ dog
│ ✦ awoo
│ ✦ garl
│ ✦ waifu
│ ✦ neko
│ ✦ megnumin
│ ✦ maid
│ ✦ loli
│ ✦ animegirl
│ ✦ animegirl1
│ ✦ animegirl2
│ ✦ animegirl3
│ ✦ animegirl4
│ ✦ animegirl5
│ ✦ anime1
│ ✦ anime2
│ ✦ anime3
│ ✦ anime4
│ ✦ anime5
│ ✦ animenews
│ ✦ foxgirl
│ ✦ naruto
└─────────────────

╔═══════════════════════╗
   🌸 𝗔𝗻𝗶𝗺𝗲 𝗪𝗼𝗿𝗹𝗱!
╚═══════════════════════╝`;

        await sendMenuWithVoice(conn, from, mek, dec);

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// AI Menu
cmd({
    pattern: "aimenu",
    desc: "🤖 AI Menu",
    category: "menu",
    react: "🧠",
    filename: __filename
}, 
async (conn, mek, m, { from, reply }) => {
    try {
        let dec = `╔═══════════════════════╗
   🤖 𝗔𝗜 𝗠𝗘𝗡𝗨 🤖
╚═══════════════════════╝

✦ 𝗔𝗜 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦 ✦
┌─────────────────
│ ✦ ai
│ ✦ gpt3
│ ✦ gpt2
│ ✦ gptmini
│ ✦ gpt
│ ✦ meta
│ ✦ blackbox
│ ✦ luma
│ ✦ dj 
│ ✦ khan
│ ✦ jawad
│ ✦ gpt4
│ ✦ bing
│ ✦ imagine 
│ ✦ imagine2
│ ✦ copilot
└─────────────────

╔═══════════════════════╗
   🧠 𝗔𝗜 𝗣𝗼𝘄𝗲𝗿𝗲𝗱!
╚═══════════════════════╝`;

        await sendMenuWithVoice(conn, from, mek, dec);

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});