const { cmd } = require('../command');
const yts = require('yt-search');
const axios = require('axios');

cmd({
    pattern: "drama",
    alias: ["ytdrama", "ytfind"],
    react: "🎭",
    desc: "Search YouTube & download drama/video",
    category: "download",
    use: ".drama <name>",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        const query = args.join(" ");
        if (!query) {
            return reply("*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*\n*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*\n*│*\n*│* ❌ Please provide a drama name or search text.\n*│*\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*");
        }

        // ⏳ React loading
        await conn.sendMessage(from, {
            react: { text: "⏳", key: m.key }
        });

        // 🔍 YouTube search
        const search = await yts(query);
        if (!search.videos || search.videos.length === 0) {
            return reply("*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*\n*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*\n*│*\n*│* ❌ No video found for your search.\n*│*\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*");
        }

        const video = search.videos[0];

        // 📋 Info message
        const infoText = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎭 *DRAMA FOUND*
*│*
*│* 🎬 *Title:* ${video.title}
*│* 👤 *Channel:* ${video.author?.name || "Unknown"}
*│* ⏱️ *Duration:* ${video.timestamp}
*│* 👁️ *Views:* ${video.views.toLocaleString()}
*│* 📅 *Uploaded:* ${video.ago}
*│*
*│* ⏳ *Downloading video, please wait...*
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

        await conn.sendMessage(from, {
            image: { url: video.thumbnail },
            caption: infoText
        }, { quoted: mek });

        // 📥 Download API (Arslan)
        const apiUrl = `https://arslan-apis.vercel.app/download/ytmp4?url=${encodeURIComponent(video.url)}`;
        const res = await axios.get(apiUrl, { timeout: 60000 });

        if (!res.data || res.data.status !== true || !res.data.result) {
            return reply("*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*\n*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*\n*│*\n*│* ❌ Drama download error.\n*│* Please try again after a short while.\n*│*\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*");
        }

        const result = res.data.result;

        // 📤 Send video
        const successText = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎬 *${result.title || video.title}*
*│*
*│* 📦 *Quality:* ${result.quality || "MP4"}
*│* ⏱️ *Duration:* ${result.duration || video.timestamp}
*│*
*│* ✅ *Download complete*
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

        await conn.sendMessage(from, {
            video: { url: result.url },
            mimetype: "video/mp4",
            caption: successText
        }, { quoted: mek });

        // ✅ Success react
        await conn.sendMessage(from, {
            react: { text: "✅", key: m.key }
        });

    } catch (error) {
        console.error("DRAMA ERROR:", error);
        reply("*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*\n*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*\n*│*\n*│* ❌ Drama download error.\n*│* Please try again after a short while.\n*│*\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*");
        await conn.sendMessage(from, {
            react: { text: "❌", key: m.key }
        });
    }
});