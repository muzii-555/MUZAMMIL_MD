const fs = require('fs');
const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');

cmd({
    pattern: "menu",
    desc: "Show MUZAMMIL-MD Premium Button Menu",
    category: "main",
    react: "💫",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const totalCommands = Object.keys(commands).length;
        const uptime = runtime(process.uptime());

        // 💎 MAIN MENU DESIGN
        const menuCaption = `
*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸* 👑 *OWNER:* MUZAMMIL-MD
*┇▸* 🛠️ *COMMANDS:* ${totalCommands}+
*┇▸* 🕐 *UPTIME:* ${uptime}
*┇▸* ⚡ *PREFIX:* [ . ]
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*

📋 *ᴄʜᴏᴏsᴇ ᴀ ᴄᴀᴛᴇɢᴏʀʏ ᴛᴏ ᴇxᴘʟᴏʀᴇ:*
> _ᴊᴜsᴛ ᴛᴀᴘ ᴀ ʙᴜᴛᴛᴏɴ ʙᴇʟᴏᴡ_ 

> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ MUZAMMIL-MD Official ❣️*
        `.trim();

        const contextInfo = {
            externalAdReply: {
                title: "𝙈𝙐𝙕𝘼ММ𝙄𝙇-𝙈𝘿 ᴘʀᴇᴍɪᴜᴍ ᴠ5",
                body: "ᴏғғɪᴄɪᴀʟ ʙᴜsɪɴᴇss ʙᴏᴛ",
                thumbnailUrl: config.MENU_IMAGE_URL || 'https://i.ibb.co/0jqkQ5p/muzammil-md.jpg',
                sourceUrl: 'https://github.com/muzammil-md',
                mediaType: 1,
                renderLargerThumbnail: true,
                showAdAttribution: true
            }
        };

        // 🎯 BUTTONS
        const buttons = [
            { buttonId: 'menu_1', buttonText: { displayText: '❶ Downloader' }, type: 1 },
            { buttonId: 'menu_2', buttonText: { displayText: '❷ Group' }, type: 1 },
            { buttonId: 'menu_3', buttonText: { displayText: '❸ Fun' }, type: 1 },
            { buttonId: 'menu_4', buttonText: { displayText: '❹ Owner' }, type: 1 },
            { buttonId: 'menu_5', buttonText: { displayText: '❺ AI' }, type: 1 },
            { buttonId: 'menu_6', buttonText: { displayText: '❻ Anime' }, type: 1 },
            { buttonId: 'menu_7', buttonText: { displayText: '❼ Convert' }, type: 1 },
            { buttonId: 'menu_8', buttonText: { displayText: '❽ Other' }, type: 1 },
            { buttonId: 'menu_9', buttonText: { displayText: '❾ Reaction' }, type: 1 },
            { buttonId: 'menu_10', buttonText: { displayText: '❿ Main' }, type: 1 }
        ];

        // 🛠️ MENU DATA (same as before)
        const menuData = {
            'menu_1': `━━━〔 *Downloader Menu* 〕━━━┈⊷
┃✦╭──────────────
┃✦│ • facebook
┃✦│ • tiktok
┃✦│ • instagram
┃✦│ • ytmp3
┃✦│ • ytmp4
┃✦│ • play
┃✦│ • song
┃✦│ • video
┃✦│ • apk
┃✦╰──────────────
╰━━━━━━━━━━━━━━━┈⊷`,

            'menu_2': `━━━〔 *Group Menu* 〕━━━┈⊷
┃✦╭──────────────
┃✦│ • add
┃✦│ • kick
┃✦│ • promote
┃✦│ • demote
┃✦│ • mute
┃✦│ • unmute
┃✦│ • tagall
┃✦│ • hidetag
┃✦│ • lockgc
┃✦╰──────────────
╰━━━━━━━━━━━━━━━┈⊷`,

            'menu_3': `━━━〔 *Fun Menu* 〕━━━┈⊷
┃✦╭──────────────
┃✦│ • joke
┃✦│ • hack
┃✦│ • ship
┃✦│ • rate
┃✦│ • truth
┃✦│ • dare
┃✦│ • character
┃✦╰──────────────
╰━━━━━━━━━━━━━━━┈⊷`,

            'menu_4': `━━━〔 *Owner Menu* 〕━━━┈⊷
┃✦╭──────────────
┃✦│ • restart
┃✦│ • shutdown
┃✦│ • update
┃✦│ • block
┃✦│ • unblock
┃✦│ • eval
┃✦│ • setpp
┃✦╰──────────────
╰━━━━━━━━━━━━━━━┈⊷`,

            'menu_5': `━━━〔 *AI Menu* 〕━━━┈⊷
┃✦╭──────────────
┃✦│ • ai
┃✦│ • gpt
┃✦│ • imagine
┃✦│ • blackbox
┃✦│ • gemini
┃✦│ • bard
┃✦╰──────────────
╰━━━━━━━━━━━━━━━┈⊷`,

            'menu_6': `━━━〔 *Anime Menu* 〕━━━┈⊷
┃✦╭──────────────
┃✦│ • waifu
┃✦│ • neko
┃✦│ • loli
┃✦│ • shinobu
┃✦│ • megumin
┃✦╰──────────────
╰━━━━━━━━━━━━━━━┈⊷`,

            'menu_7': `━━━〔 *Convert Menu* 〕━━━┈⊷
┃✦╭──────────────
┃✦│ • sticker
┃✦│ • tomp3
┃✦│ • toimg
┃✦│ • tourl
┃✦│ • togif
┃✦╰──────────────
╰━━━━━━━━━━━━━━━┈⊷`,

            'menu_8': `━━━〔 *Other Menu* 〕━━━┈⊷
┃✦╭──────────────
┃✦│ • news
┃✦│ • weather
┃✦│ • google
┃✦│ • calculate
┃✦│ • date
┃✦╰──────────────
╰━━━━━━━━━━━━━━━┈⊷`,

            'menu_9': `━━━〔 *Reaction Menu* 〕━━━┈⊷
┃✦╭──────────────
┃✦│ • hug
┃✦│ • kiss
┃✦│ • slap
┃✦│ • punch
┃✦│ • smile
┃✦╰──────────────
╰━━━━━━━━━━━━━━━┈⊷`,

            'menu_10': `━━━〔 *Main Menu* 〕━━━┈⊷
┃✦╭──────────────
┃✦│ • ping
┃✦│ • alive
┃✦│ • runtime
┃✦│ • uptime
┃✦│ • owner
┃✦│ • repo
┃✦╰──────────────
┃✦╭──────────────
┃✦│ • menu
┃✦│ • help
┃✦│ • restart
┃✦│ • status
┃✦│ • listcmd
┃✦│ • support
┃✦╰──────────────
┃✦╭──────────────
┃✦│ • Platform: Heroku
┃✦│ • Speed: Ultra Fast
┃✦│ • Security: Maximum
┃✦│ • Accuracy: 99.9%
┃✦│ • Memory: Optimized
┃✦╰──────────────
╰━━━━━━━━━━━━━━━┈⊷`
        };

        // 🚀 SEND BUTTON MENU
        await conn.sendMessage(from, {
            image: { url: config.MENU_IMAGE_URL || 'https://i.ibb.co/0jqkQ5p/muzammil-md.jpg' },
            caption: menuCaption,
            buttons: buttons,
            headerType: 4,
            contextInfo: contextInfo
        }, { quoted: mek });

        // 🔔 BUTTON HANDLER
        conn.ev.on('messages.upsert', async msgData => {
            const msg = msgData.messages[0];
            if (!msg?.message?.buttonsResponseMessage) return;

            const buttonId = msg.message.buttonsResponseMessage.selectedButtonId;
            if (menuData[buttonId]) {
                await conn.sendMessage(msg.key.remoteJid, {
                    image: { url: config.MENU_IMAGE_URL || 'https://i.ibb.co/0jqkQ5p/muzammil-md.jpg' },
                    caption: menuData[buttonId] + "\n\n> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ MUZAMMIL-MD Official ❣️*",
                    contextInfo: contextInfo
                }, { quoted: msg });
            }
        });

    } catch (e) {
        console.error('Menu Error:', e);
        reply("🌀 *sʏsᴛᴇᴍ ʙᴜsʏ*");
    }
});
