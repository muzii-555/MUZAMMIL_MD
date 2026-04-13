const config = require('../config');
const { cmd } = require('../command');
const { runtime } = require('../lib/functions');
const os = require("os");
const path = require('path');
const axios = require('axios');
const fs = require('fs');

cmd({
    pattern: "env",
    desc: "menu the bot",
    category: "menu3",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, sender, pushname, reply }) => {
    try {
        const dec = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* ✨ *Owner:* MUZAMMIL
*│* ⚙️ *Mode:* ${config.MODE}
*│* 📡 *Platform:* MUZAMMIL Hosting
*│* 🧠 *Type:* NodeJs (Multi Device)
*│* ⌨️ *Prefix:* ${config.PREFIX}
*│* 🧾 *Version:* 5.0.0 
*│*
*│* ────── *Menu* ──────
*│*
*│* • *admin-events*
*│* • *welcome*
*│* • *setprefix*
*│* • *mode*
*│* • *auto_typing*
*│* • *always_online*
*│* • *auto_reacording*
*│* • *status_view* 
*│* • *status_react*
*│* • *read_message*
*│* • *auto_sticker*
*│* • *anti_bad*
*│* • *auto_reply*
*│* • *auto_voice*
*│* • *custom_reacts*
*│* • *auto_react*
*│* • *anti_link* 
*│* • *status_reply*
*│*
*│* 📌 *${config.DESCRIPTION || "MUZAMMIL-MD WhatsApp Bot"}*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

        await conn.sendMessage(
            from,
            {
                image: { url: config.MENU_IMAGE_URL },
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

        // Send local audio from assets/menu.m4a
        const audioPath = path.join(__dirname, '../assets/menu.m4a');
        await conn.sendMessage(from, {
            audio: fs.readFileSync(audioPath),
            mimetype: 'audio/mp4',
            ptt: false,
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*\n*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*\n*│*\n*│* ❌ *Error:*\n*│* ${e}\n*│*\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`);
    }
});