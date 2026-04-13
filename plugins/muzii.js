const { cmd } = require("../command");
const os = require("os");

cmd({
    pattern: "muzii",
    alias: ["mafia", "muzammil"],
    desc: "MUZAMMIL full introduction",
    category: "info",
    react: "👑",
    filename: __filename
}, async (conn, mek, m, { from }) => {
    try {

        const uptime = process.uptime();
        const h = Math.floor(uptime / 3600);
        const min = Math.floor((uptime % 3600) / 60);
        const sec = Math.floor(uptime % 60);

        const text = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 👤 *Name:* MUZAMMIL
*│* 🧑‍💼 *Nick:* MUZAMMIL
*│* 🎂 *Age:* 18
*│* 🧬 *Caste:* ᴀᴇʀɪ
*│* 🌍 *Country:* ᴘᴀᴋɪsᴛᴀɴ
*│* 🏙️ *City:* (ᴅ.ᴍ.ᴊ)
*│*
*│* 🤖 *Bot Name:* MUZAMMIL-MD
*│* 👑 *Owner:* MUZAMMIL
*│* 📞 *Owner No:* +923375626980
*│* 🔣 *Prefix:* .
*│* ⚙️ *Mode:* ᴘᴜʙʟɪᴄ
*│* 🔌 *Baileys:* ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ
*│*
*│* ⏳ *Uptime:* ${h}h ${min}m ${sec}s
*│* 💻 *Platform:* ${os.platform()}
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

        await conn.sendMessage(from, {
            text,
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

    } catch (e) {
        console.log(e);
    }
});