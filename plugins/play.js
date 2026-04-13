const { cmd } = require('../command');
const yts = require('yt-search');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

ffmpeg.setFfmpegPath(ffmpegPath);

// Store temporary data for button responses
const playData = {};

cmd({
    pattern: "play",
    alias: ["song", "audio", "music", "ytplay"],
    react: "🎵",
    desc: "Search and download from YouTube with format options",
    category: "download",
    use: ".play <song name>",
    filename: __filename
}, async (conn, mek, m, { from, args, reply, sender }) => {
    try {
        const query = args.join(" ");
        if (!query) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎵 *PLAY COMMAND*
*│*
*│* ❌ Please provide a song name!
*│*
*│* 📝 *Example:* .play pal pal
*│* 📝 *Example:* .play alan walker
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        // ⏳ react
        await conn.sendMessage(from, {
            react: { text: "⏳", key: m.key }
        });

        // 🔍 YouTube search
        const search = await yts(query);
        if (!search.videos || !search.videos.length) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎵 *PLAY COMMAND*
*│*
*│* ❌ No song found for *"${query}"*!
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        const video = search.videos[0];
        
        // Get first 3 results for selection
        const topResults = search.videos.slice(0, 3);

        // Store video data for button responses
        playData[sender] = {
            videos: topResults,
            selected: 0,
            timestamp: Date.now()
        };

        // Build results list
        let resultsList = '';
        topResults.forEach((v, i) => {
            resultsList += `*│* ${i+1}. *${v.title}*\n`;
            resultsList += `*│*    ⏱️ ${v.timestamp} | 👁️ ${v.views}\n`;
        });

        // Send preview and format selection buttons
        const buttonMessage = {
            image: { url: video.thumbnail },
            caption: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎵 *SEARCH RESULTS*
*│*
${resultsList}
*│*
*│* 📌 *Select download format:*
*│*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`,
            footer: "MUZAMMIL-MD",
            buttons: [
                { buttonId: 'play_audio', buttonText: { displayText: '🎵 Audio (MP3)' }, type: 1 },
                { buttonId: 'play_video', buttonText: { displayText: '🎬 Video (MP4)' }, type: 1 },
                { buttonId: 'play_document', buttonText: { displayText: '📁 Document' }, type: 1 }
            ],
            headerType: 4,
            viewOnce: true
        };

        await conn.sendMessage(from, buttonMessage, { quoted: mek });
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

    } catch (err) {
        console.error("PLAY ERROR:", err);
        reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎵 *PLAY COMMAND*
*│*
*│* ❌ Search error! Please try again.
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
        await conn.sendMessage(from, { react: { text: "❌", key: m.key } });
    }
});

// Button Handler - Audio (MP3)
cmd({
    pattern: "play_audio",
    react: "🎵",
    desc: "Download as Audio",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, reply, sender }) => {
    try {
        const data = playData[sender];
        if (!data || !data.videos) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Session expired! Please use .play again.
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        const video = data.videos[data.selected];
        
        await conn.sendMessage(from, { react: { text: '🎵', key: m.key } });
        
        const processingMsg = await conn.sendMessage(from, {
            text: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ⏳ *Converting to MP3...*\n*│* 🎵 ${video.title}\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        }, { quoted: mek });

        // API for audio
        const apiUrl = `https://arslan-apis.vercel.app/download/ytmp3?url=${encodeURIComponent(video.url)}`;
        const res = await axios.get(apiUrl, { timeout: 60000 });

        if (!res.data || res.data.status !== true || !res.data.result?.download?.url) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Audio download error!
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        const audioUrl = res.data.result.download.url;

        // temp folder
        const tempDir = path.join(__dirname, '../temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        const inputPath = path.join(tempDir, `input_${Date.now()}.mp3`);
        const outputPath = path.join(tempDir, `output_${Date.now()}.mp3`);

        const audioData = await axios.get(audioUrl, { responseType: 'arraybuffer' });
        fs.writeFileSync(inputPath, audioData.data);

        // FFMPEG conversion
        await new Promise((resolve, reject) => {
            ffmpeg(inputPath)
                .audioCodec('libmp3lame')
                .audioBitrate('128k')
                .audioChannels(2)
                .audioFrequency(44100)
                .format('mp3')
                .on('end', resolve)
                .on('error', reject)
                .save(outputPath);
        });

        await conn.sendMessage(from, {
            audio: fs.readFileSync(outputPath),
            mimetype: "audio/mpeg",
            fileName: `${video.title}.mp3`,
            caption: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* 🎶 *${video.title}*\n*│* ✅ *Audio Downloaded!*\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        }, { quoted: mek });

        fs.unlinkSync(inputPath);
        fs.unlinkSync(outputPath);
        
        delete playData[sender];
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (err) {
        console.error("AUDIO ERROR:", err);
        reply(`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❌ Audio conversion failed!\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`);
    }
});

// Button Handler - Video (MP4)
cmd({
    pattern: "play_video",
    react: "🎬",
    desc: "Download as Video",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, reply, sender }) => {
    try {
        const data = playData[sender];
        if (!data || !data.videos) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Session expired! Please use .play again.
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        const video = data.videos[data.selected];
        
        await conn.sendMessage(from, { react: { text: '🎬', key: m.key } });
        
        const processingMsg = await conn.sendMessage(from, {
            text: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ⏳ *Downloading Video...*\n*│* 🎬 ${video.title}\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        }, { quoted: mek });

        // API for video
        const apiUrl = `https://arslan-apis.vercel.app/download/ytmp4?url=${encodeURIComponent(video.url)}`;
        const res = await axios.get(apiUrl, { timeout: 60000 });

        if (!res.data || res.data.status !== true || !res.data.result?.download?.url) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Video download error!
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        const videoUrl = res.data.result.download.url;

        await conn.sendMessage(from, {
            video: { url: videoUrl },
            mimetype: "video/mp4",
            caption: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* 🎬 *${video.title}*\n*│* ✅ *Video Downloaded!*\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        }, { quoted: mek });

        delete playData[sender];
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (err) {
        console.error("VIDEO ERROR:", err);
        reply(`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❌ Video download failed!\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`);
    }
});

// Button Handler - Document
cmd({
    pattern: "play_document",
    react: "📁",
    desc: "Download as Document",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, reply, sender }) => {
    try {
        const data = playData[sender];
        if (!data || !data.videos) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Session expired! Please use .play again.
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        const video = data.videos[data.selected];
        
        await conn.sendMessage(from, { react: { text: '📁', key: m.key } });
        
        const processingMsg = await conn.sendMessage(from, {
            text: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ⏳ *Preparing Document...*\n*│* 📁 ${video.title}\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        }, { quoted: mek });

        // API for audio (document as MP3)
        const apiUrl = `https://arslan-apis.vercel.app/download/ytmp3?url=${encodeURIComponent(video.url)}`;
        const res = await axios.get(apiUrl, { timeout: 60000 });

        if (!res.data || res.data.status !== true || !res.data.result?.download?.url) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Document download error!
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        const audioUrl = res.data.result.download.url;

        // temp folder
        const tempDir = path.join(__dirname, '../temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        const inputPath = path.join(tempDir, `input_${Date.now()}.mp3`);
        const outputPath = path.join(tempDir, `output_${Date.now()}.mp3`);

        const audioData = await axios.get(audioUrl, { responseType: 'arraybuffer' });
        fs.writeFileSync(inputPath, audioData.data);

        // FFMPEG conversion
        await new Promise((resolve, reject) => {
            ffmpeg(inputPath)
                .audioCodec('libmp3lame')
                .audioBitrate('128k')
                .audioChannels(2)
                .audioFrequency(44100)
                .format('mp3')
                .on('end', resolve)
                .on('error', reject)
                .save(outputPath);
        });

        await conn.sendMessage(from, {
            document: fs.readFileSync(outputPath),
            mimetype: "audio/mpeg",
            fileName: `${video.title}.mp3`,
            caption: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* 📁 *${video.title}*\n*│* ✅ *Document Ready!*\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        }, { quoted: mek });

        fs.unlinkSync(inputPath);
        fs.unlinkSync(outputPath);
        
        delete playData[sender];
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (err) {
        console.error("DOCUMENT ERROR:", err);
        reply(`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❌ Document preparation failed!\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`);
    }
});