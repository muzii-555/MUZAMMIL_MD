const { cmd } = require("../command");
const yts = require("yt-search");
const axios = require("axios");
const fs = require('fs');
const path = require('path');

// Store temporary data for button responses
const play3Data = {};

cmd({
    pattern: "play3",
    react: "🎶",
    alias: ["song3", "music3", "audio3"],
    desc: "Search and download with format options",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, q, reply, sender }) => {
    try {
        if (!q) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎶 *PLAY3 COMMAND*
*│*
*│* ❌ Please provide a song name!
*│*
*│* 📝 *Example:* .play3 jane tu
*│* 📝 *Example:* .play3 faded
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        await conn.sendMessage(from, { react: { text: "⏳", key: m.key } });

        const search = await yts(q);
        if (!search.videos.length) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎶 *PLAY3 COMMAND*
*│*
*│* ❌ No song found for *"${q}"*!
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        // Get top 3 results
        const topResults = search.videos.slice(0, 3);
        const video = topResults[0];

        // Store video data for button responses
        play3Data[sender] = {
            videos: topResults,
            selected: 0,
            timestamp: Date.now()
        };

        // Build results list
        let resultsList = '';
        topResults.forEach((v, i) => {
            resultsList += `*│* ${i+1}. *${v.title.slice(0, 40)}${v.title.length > 40 ? '...' : ''}*\n`;
            resultsList += `*│*    ⏱️ ${v.timestamp} | 👁️ ${v.views}\n`;
        });

        // Send preview with buttons
        const buttonMessage = {
            image: { url: video.thumbnail },
            caption: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎶 *SEARCH RESULTS*
*│*
${resultsList}
*│*
*│* 📌 *Select download format:*
*│*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`,
            footer: "MUZAMMIL-MD",
            buttons: [
                { buttonId: 'play3_audio', buttonText: { displayText: '🎵 Audio (MP3)' }, type: 1 },
                { buttonId: 'play3_video', buttonText: { displayText: '🎬 Video (MP4)' }, type: 1 },
                { buttonId: 'play3_document', buttonText: { displayText: '📁 Document' }, type: 1 }
            ],
            headerType: 4,
            viewOnce: true
        };

        await conn.sendMessage(from, buttonMessage, { quoted: mek });
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (err) {
        console.error("PLAY3 ERROR:", err?.message || err);
        reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎶 *PLAY3 COMMAND*
*│*
*│* ❌ Search error! Please try again.
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }
});

// Button Handler - Audio (MP3)
cmd({
    pattern: "play3_audio",
    react: "🎵",
    desc: "Download as Audio",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, reply, sender }) => {
    try {
        const data = play3Data[sender];
        if (!data || !data.videos) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Session expired! Please use .play3 again.
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        const video = data.videos[data.selected];
        await conn.sendMessage(from, { react: { text: '🎵', key: m.key } });

        // Processing message
        await conn.sendMessage(from, {
            text: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* 🎵 *Downloading Audio...*\n*│* 📝 ${video.title}\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        }, { quoted: mek });

        const apiUrl = `http://31.220.82.203:2029/api/yta?url=${encodeURIComponent(video.url)}`;
        const res = await axios.get(apiUrl, {
            responseType: "arraybuffer",
            timeout: 60000
        });

        const caption = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎶 *${video.title}*
*│* ⏱️ ${video.timestamp}
*│* ✅ *Audio Downloaded!*
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

        await conn.sendMessage(from, {
            audio: Buffer.from(res.data),
            mimetype: "audio/mp4",
            ptt: false,
            caption
        }, { quoted: mek });

        delete play3Data[sender];
        await conn.sendMessage(from, { react: { text: "✅", key: m.key } });

    } catch (err) {
        console.error("PLAY3 AUDIO ERROR:", err?.message || err);
        reply(`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❌ Audio download failed!\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`);
    }
});

// Button Handler - Video (MP4)
cmd({
    pattern: "play3_video",
    react: "🎬",
    desc: "Download as Video",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, reply, sender }) => {
    try {
        const data = play3Data[sender];
        if (!data || !data.videos) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Session expired! Please use .play3 again.
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        const video = data.videos[data.selected];
        await conn.sendMessage(from, { react: { text: '🎬', key: m.key } });

        // Processing message
        await conn.sendMessage(from, {
            text: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* 🎬 *Downloading Video...*\n*│* 📝 ${video.title}\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        }, { quoted: mek });

        const apiUrl = `http://31.220.82.203:2029/api/ytv?url=${encodeURIComponent(video.url)}`;
        const res = await axios.get(apiUrl, {
            timeout: 60000
        });

        if (!res.data?.url) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Video download error!
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        const caption = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎬 *${video.title}*
*│* ⏱️ ${video.timestamp}
*│* ✅ *Video Downloaded!*
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

        await conn.sendMessage(from, {
            video: { url: res.data.url },
            mimetype: "video/mp4",
            caption
        }, { quoted: mek });

        delete play3Data[sender];
        await conn.sendMessage(from, { react: { text: "✅", key: m.key } });

    } catch (err) {
        console.error("PLAY3 VIDEO ERROR:", err?.message || err);
        reply(`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❌ Video download failed!\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`);
    }
});

// Button Handler - Document
cmd({
    pattern: "play3_document",
    react: "📁",
    desc: "Download as Document",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, reply, sender }) => {
    try {
        const data = play3Data[sender];
        if (!data || !data.videos) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Session expired! Please use .play3 again.
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        const video = data.videos[data.selected];
        await conn.sendMessage(from, { react: { text: '📁', key: m.key } });

        // Processing message
        await conn.sendMessage(from, {
            text: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* 📁 *Preparing Document...*\n*│* 📝 ${video.title}\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        }, { quoted: mek });

        const apiUrl = `http://31.220.82.203:2029/api/yta?url=${encodeURIComponent(video.url)}`;
        const res = await axios.get(apiUrl, {
            responseType: "arraybuffer",
            timeout: 60000
        });

        const caption = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📁 *${video.title}*
*│* ⏱️ ${video.timestamp}
*│* ✅ *Document Ready!*
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

        await conn.sendMessage(from, {
            document: Buffer.from(res.data),
            mimetype: "audio/mpeg",
            fileName: `${video.title}.mp3`,
            caption
        }, { quoted: mek });

        delete play3Data[sender];
        await conn.sendMessage(from, { react: { text: "✅", key: m.key } });

    } catch (err) {
        console.error("PLAY3 DOCUMENT ERROR:", err?.message || err);
        reply(`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❌ Document preparation failed!\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`);
    }
});