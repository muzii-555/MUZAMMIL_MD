const { cmd } = require('../command')
const axios = require('axios')
const yts = require('yt-search')
const fs = require('fs')
const path = require('path')
const ffmpeg = require('fluent-ffmpeg')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path

ffmpeg.setFfmpegPath(ffmpegPath)

// Store temporary data for button responses
const song2Data = {};

cmd({
    pattern: "song2",
    alias: ["play2", "music2", "yt2"],
    desc: "Download YouTube song with format options",
    category: "download",
    react: "🎧",
    filename: __filename
}, async (conn, mek, m, { from, reply, text, sender }) => {
    try {
        if (!text) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎧 *SONG2 COMMAND*
*│*
*│* ❌ Please provide a song name!
*│*
*│* 📝 *Example:* .song2 la la la
*│* 📝 *Example:* .song2 faded
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            )
        }

        // ⏳ react
        await conn.sendMessage(from, { react: { text: "⏳", key: m.key } })

        // 🔍 YouTube search
        const search = await yts(text)
        if (!search.videos || !search.videos.length) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎧 *SONG2 COMMAND*
*│*
*│* ❌ No song found for *"${text}"*!
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            )
        }

        // Get top 3 results
        const topResults = search.videos.slice(0, 3)
        const vid = topResults[0]

        // Store video data for button responses
        song2Data[sender] = {
            videos: topResults,
            selected: 0,
            timestamp: Date.now()
        }

        // Build results list
        let resultsList = ''
        topResults.forEach((v, i) => {
            resultsList += `*│* ${i+1}. *${v.title.slice(0, 40)}${v.title.length > 40 ? '...' : ''}*\n`
            resultsList += `*│*    ⏱️ ${v.timestamp} | 👁️ ${v.views}\n`
        })

        // Send preview with buttons
        const buttonMessage = {
            image: { url: vid.thumbnail },
            caption: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎧 *SEARCH RESULTS*
*│*
${resultsList}
*│*
*│* 📌 *Select download format:*
*│*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`,
            footer: "MUZAMMIL-MD",
            buttons: [
                { buttonId: 'song2_audio', buttonText: { displayText: '🎵 Audio (MP3)' }, type: 1 },
                { buttonId: 'song2_video', buttonText: { displayText: '🎬 Video (MP4)' }, type: 1 },
                { buttonId: 'song2_document', buttonText: { displayText: '📁 Document' }, type: 1 }
            ],
            headerType: 4,
            viewOnce: true
        }

        await conn.sendMessage(from, buttonMessage, { quoted: mek })
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } })

    } catch (err) {
        console.error("SONG2 ERROR:", err)
        reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎧 *SONG2 COMMAND*
*│*
*│* ❌ Search error! Please try again.
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        )
    }
})

// Button Handler - Audio (MP3)
cmd({
    pattern: "song2_audio",
    react: "🎵",
    desc: "Download as Audio",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, reply, sender }) => {
    try {
        const data = song2Data[sender]
        if (!data || !data.videos) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Session expired! Please use .song2 again.
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            )
        }

        const vid = data.videos[data.selected]
        await conn.sendMessage(from, { react: { text: '🎵', key: m.key } })

        // Processing message
        await conn.sendMessage(from, {
            text: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* 🎵 *Converting to MP3...*\n*│* 📝 ${vid.title}\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        }, { quoted: mek })

        // Arslan VIDEO API
        const api = `https://arslan-apis.vercel.app/download/ytmp4?url=${encodeURIComponent(vid.url)}`
        const res = await axios.get(api, { timeout: 60000 })

        if (!res.data?.status || !res.data?.result?.download?.url) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Audio download error!
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            )
        }

        const videoUrl = res.data.result.download.url

        // Temp files
        const tempDir = path.join(__dirname, '../temp')
        if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true })

        const videoPath = path.join(tempDir, `song2_${Date.now()}.mp4`)
        const audioPath = path.join(tempDir, `song2_${Date.now()}.mp3`)

        // Download video
        const stream = await axios({
            url: videoUrl,
            method: "GET",
            responseType: "stream",
            timeout: 120000
        })

        await new Promise((resolve, reject) => {
            const w = fs.createWriteStream(videoPath)
            stream.data.pipe(w)
            w.on('finish', resolve)
            w.on('error', reject)
        })

        // FFmpeg → MP3
        await new Promise((resolve, reject) => {
            ffmpeg(videoPath)
                .noVideo()
                .audioCodec('libmp3lame')
                .audioBitrate('128k')
                .format('mp3')
                .on('end', resolve)
                .on('error', reject)
                .save(audioPath)
        })

        // Send Audio
        await conn.sendMessage(from, {
            audio: fs.readFileSync(audioPath),
            mimetype: "audio/mpeg",
            fileName: `${vid.title}.mp3`,
            caption: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* 🎶 *${vid.title}*\n*│* ✅ *Audio Downloaded!*\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        }, { quoted: mek })

        // Cleanup
        fs.unlinkSync(videoPath)
        fs.unlinkSync(audioPath)
        delete song2Data[sender]
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } })

    } catch (err) {
        console.error("SONG2 AUDIO ERROR:", err)
        reply(`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❌ Audio conversion failed!\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`)
    }
})

// Button Handler - Video (MP4)
cmd({
    pattern: "song2_video",
    react: "🎬",
    desc: "Download as Video",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, reply, sender }) => {
    try {
        const data = song2Data[sender]
        if (!data || !data.videos) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Session expired! Please use .song2 again.
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            )
        }

        const vid = data.videos[data.selected]
        await conn.sendMessage(from, { react: { text: '🎬', key: m.key } })

        // Processing message
        await conn.sendMessage(from, {
            text: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* 🎬 *Downloading Video...*\n*│* 📝 ${vid.title}\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        }, { quoted: mek })

        // Arslan VIDEO API
        const api = `https://arslan-apis.vercel.app/download/ytmp4?url=${encodeURIComponent(vid.url)}`
        const res = await axios.get(api, { timeout: 60000 })

        if (!res.data?.status || !res.data?.result?.download?.url) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Video download error!
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            )
        }

        const videoUrl = res.data.result.download.url

        // Send Video
        await conn.sendMessage(from, {
            video: { url: videoUrl },
            mimetype: "video/mp4",
            caption: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* 🎬 *${vid.title}*\n*│* ✅ *Video Downloaded!*\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        }, { quoted: mek })

        delete song2Data[sender]
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } })

    } catch (err) {
        console.error("SONG2 VIDEO ERROR:", err)
        reply(`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❌ Video download failed!\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`)
    }
})

// Button Handler - Document
cmd({
    pattern: "song2_document",
    react: "📁",
    desc: "Download as Document",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, reply, sender }) => {
    try {
        const data = song2Data[sender]
        if (!data || !data.videos) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Session expired! Please use .song2 again.
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            )
        }

        const vid = data.videos[data.selected]
        await conn.sendMessage(from, { react: { text: '📁', key: m.key } })

        // Processing message
        await conn.sendMessage(from, {
            text: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* 📁 *Preparing Document...*\n*│* 📝 ${vid.title}\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        }, { quoted: mek })

        // Arslan VIDEO API
        const api = `https://arslan-apis.vercel.app/download/ytmp4?url=${encodeURIComponent(vid.url)}`
        const res = await axios.get(api, { timeout: 60000 })

        if (!res.data?.status || !res.data?.result?.download?.url) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Document download error!
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            )
        }

        const videoUrl = res.data.result.download.url

        // Temp files
        const tempDir = path.join(__dirname, '../temp')
        if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true })

        const videoPath = path.join(tempDir, `song2_${Date.now()}.mp4`)
        const audioPath = path.join(tempDir, `song2_${Date.now()}.mp3`)

        // Download video
        const stream = await axios({
            url: videoUrl,
            method: "GET",
            responseType: "stream",
            timeout: 120000
        })

        await new Promise((resolve, reject) => {
            const w = fs.createWriteStream(videoPath)
            stream.data.pipe(w)
            w.on('finish', resolve)
            w.on('error', reject)
        })

        // FFmpeg → MP3
        await new Promise((resolve, reject) => {
            ffmpeg(videoPath)
                .noVideo()
                .audioCodec('libmp3lame')
                .audioBitrate('128k')
                .format('mp3')
                .on('end', resolve)
                .on('error', reject)
                .save(audioPath)
        })

        // Send Document
        await conn.sendMessage(from, {
            document: fs.readFileSync(audioPath),
            mimetype: "audio/mpeg",
            fileName: `${vid.title}.mp3`,
            caption: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* 📁 *${vid.title}*\n*│* ✅ *Document Ready!*\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        }, { quoted: mek })

        // Cleanup
        fs.unlinkSync(videoPath)
        fs.unlinkSync(audioPath)
        delete song2Data[sender]
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } })

    } catch (err) {
        console.error("SONG2 DOCUMENT ERROR:", err)
        reply(`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❌ Document preparation failed!\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`)
    }
})