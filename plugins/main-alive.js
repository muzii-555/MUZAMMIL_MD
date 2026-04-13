const { cmd } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const config = require('../config');

cmd({
    pattern: "alive",
    alias: ["status", "online", "a"],
    desc: "Check bot is alive or not",
    category: "main",
    react: "🌈",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {

        const aliveMsg = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🤖 *Bot Status:* Online ✅
*│* 👑 *Owner:* ${config.OWNER_NAME || 'MUZAMMIL'}
*│* ⚙️ *Mode:* ${config.MODE}
*│* 🔣 *Prefix:* ${config.PREFIX}
*│* 💻 *Host:* ${os.hostname()}
*│* 💾 *RAM:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
*│* ⏱️ *Uptime:* ${runtime(process.uptime())}
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

        await conn.sendMessage(from, {
            image: { url: config.MENU_IMAGE_URL },
            caption: aliveMsg,
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
        }, { quoted: mek });

    } catch (err) {
        console.error("ALIVE ERROR:", err);

        const errorMsg = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* ❌ *Alive Command Error*
*│* ⏳ Please try again later
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

        await reply(errorMsg);
    }
});