const axios = require("axios");
const { cmd } = require("../command");

cmd({
    pattern: "playstore",
    alias: ["ps", "app", "store"],
    desc: "Search apps from PlayStore",
    category: "search",
    react: "📱",
    filename: __filename
},
async (conn, mek, m, { from, q, reply, sender }) => {
    try {

        if (!q) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📱 *PLAYSTORE SEARCH*
*│*
*│* ❌ Please provide an app name!
*│*
*│* 📝 *Example:* .playstore whatsapp
*│* 📝 *Example:* .playstore instagram
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        // Add reaction
        await conn.sendMessage(from, { react: { text: '📱', key: m.key } });

        // 🔎 API
        const api = `https://api.princetechn.com/api/search/playstore?apikey=prince&query=${q}`;
        const res = await axios.get(api);
        const data = res.data.results;

        if (!data || data.length === 0) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📱 *PLAYSTORE SEARCH*
*│*
*│* ❌ No app found for *"${q}"*!
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        const app = data[0];

        // Build message
        const msg = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📱 *APP INFORMATION*
*│*
*│* 📛 *Name:* ${app.name}
*│* 👨‍💻 *Developer:* ${app.developer}
*│* ⭐ *Rating:* ${app.rating}
*│* 📥 *Installs:* ${app.installs}
*│* 💰 *Price:* ${app.price}
*│* 📝 *About:* ${app.summary?.slice(0, 100)}${app.summary?.length > 100 ? '...' : ''}
*│* 🔗 *Link:* ${app.link}
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

        await conn.sendMessage(from, {
            image: { url: app.img },
            caption: msg,
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
        }, { quoted: mek });

        // Success reaction
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (e) {
        console.log(e);
        reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📱 *PLAYSTORE SEARCH*
*│*
*│* ❌ Search error! Please try again later.
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }
});