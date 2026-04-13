const { cmd } = require('../command');
const { runtime } = require('../lib/functions');
const config = require('../config');

/* =======================
   PING COMMAND
   Shows only ms and uptime
======================= */
cmd({
    pattern: "ping",
    react: "🏓",
    alias: ["speed", "ms", "pong"],
    desc: "Check bot response time and uptime",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, reply, sender }) => {
    try {
        const start = Date.now();
        
        // Send initial message
        const msg = await conn.sendMessage(from, { 
            text: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* 🏓 *PINGING...*\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        }, { quoted: mek });
        
        const ping = Date.now() - start;
        const uptime = runtime(process.uptime());
        
        // Get speed rating
        const rating = ping < 100 ? '🟢' : ping < 200 ? '🟡' : ping < 400 ? '🟠' : '🔴';

        const caption = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🏓 *PING TEST*
*│*
*│* ⚡ *Speed:* ${ping}ms ${rating}
*│* ⏱️ *Uptime:* ${uptime}
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

        await conn.sendMessage(from, {
            text: caption,
            edit: msg.key,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363424043617436@newsletter',
                    newsletterName: 'MUZAMMIL-MD',
                    serverMessageId: 143
                }
            }
        });

    } catch (e) {
        console.error("PING ERROR:", e);
        reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🏓 *PING TEST*
*│*
*│* ❌ Failed to check ping!
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }
});