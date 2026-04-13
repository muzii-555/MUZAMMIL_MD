const { cmd } = require('../command')
const axios = require('axios')
const yts = require('yt-search')
const fs = require('fs')
const path = require('path')
const ffmpeg = require('fluent-ffmpeg')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path

ffmpeg.setFfmpegPath(ffmpegPath)

// Store temporary data for button responses
const videoData = {};

cmd({
    pattern: "video",
    alias: ["vid", "playvideo", "ytvideo", "ytmp4"],
    desc: "YouTube video downloader with format options",
    category: "download",
    react: "🎬",
    filename: __filename
}, async (conn, mek, m, { from, text, reply, sender }) => {
    try {
        if (!text) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎬 *VIDEO DOWNLOADER*
*│*
*│* ❌ Please provide a video name or link!
*│*
*│* 📝 *Example:* .video la la la song
*│* 📝 *Example:* .video https://youtu.be/xxx
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            )
        }

        // Add reaction
        await conn.sendMessage(from, { react: { text: '🎬', key: m.key } })

        // 🔍 YouTube search
        const search = await yts(text)
        if (!search.videos.length) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎬 *VIDEO DOWNLOADER*
*│*
*│* ❌ No video found for *"${text}"*!
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            )
        }

        // Get top 3 results
        const topResults = search.videos.slice(0, 3)
        const vid = topResults[0]

        // Store video data for button responses
        videoData[sender] = {
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
*│* 🎬 *SEARCH RESULTS*
*│*
${resultsList}
*│*
*│* 📌 *Select download option:*
*│*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`,
            footer: "MUZAMMIL-MD",
            buttons: [
                { buttonId: 'video_hd', buttonText: { displayText: '🎬 HD Video' }, type: 1 },
                { buttonId: 'video_audio', buttonText: { displayText: '🎵 Audio (MP3)' }, type: 1 },
                { buttonId: 'video_doc', buttonText: { displayText: '📁 Document' }, type: 1 }
            ],
            headerType: 4,
            viewOnce: true
        }

        await conn.sendMessage(from, buttonMessage, { quoted: mek })
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } })

    } catch (err) {
        console.error("VIDEO ERROR:", err)
        reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎬 *VIDEO DOWNLOADER*
*│*
*│* ❌ Search error! Please try again.
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        )
    }
})

// Button Handler - HD Video
cmd({
    pattern: "video_hd",
    react: "🎬",
    desc: "Download HD Video",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, reply, sender }) => {
    try {
        const data = videoData[sender]
        if (!data || !data.videos) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Session expired! Please use .video again.
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            )
        }

        const vid = data.videos[data.selected]
        await conn.sendMessage(from, { react: { text: '🎬', key: m.key } })

        // Processing message
        const processingMsg = await conn.sendMessage(from, {
            text: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ⏳ *Processing video...*\n*│* 🎬 ${vid.title}\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        }, { quoted: mek })

        // API
        const api = `https://arslan-apis.vercel.app/download/ytmp4?url=${encodeURIComponent(vid.url)}`
        const res = await axios.get(api, { timeout: 60000 })

        if (!res.data?.status || !res.data?.result?.download?.url) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Video download error!
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            )
        }

        const meta = res.data.result.metadata
        const dl = res.data.result.download

        // temp folder
        const tempDir = path.join(__dirname, '../temp')
        if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true })

        const rawPath = path.join(tempDir, `raw_${Date.now()}.mp4`)
        const finalPath = path.join(tempDir, `final_${Date.now()}.mp4`)

        // Download raw video
        const stream = await axios({
            url: dl.url,
            method: "GET",
            responseType: "stream",
            timeout: 120000
        })

        await new Promise((resolve, reject) => {
            const w = fs.createWriteStream(rawPath)
            stream.data.pipe(w)
            w.on("finish", resolve)
            w.on("error", reject)
        })

        // FFMPEG conversion
        await new Promise((resolve, reject) => {
            ffmpeg(rawPath)
                .outputOptions([
                    "-map 0:v:0",
                    "-map 0:a:0?",
                    "-movflags +faststart",
                    "-pix_fmt yuv420p",
                    "-vf scale=trunc(iw/2)*2:trunc(ih/2)*2",
                    "-profile:v baseline",
                    "-level 3.0"
                ])
                .videoCodec("libx264")
                .audioCodec("aac")
                .audioBitrate("128k")
                .format("mp4")
                .on("end", resolve)
                .on("error", reject)
                .save(finalPath)
        })

        // Send final video
        const caption = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎬 *VIDEO DOWNLOADED*
*│*
*│* 📽️ *Title:* ${meta.title}
*│* 📀 *Quality:* ${dl.quality}
*│* 📁 *Format:* MP4
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`

        await conn.sendMessage(from, {
            video: fs.readFileSync(finalPath),
            mimetype: "video/mp4",
            caption,
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
        }, { quoted: mek })

        // cleanup
        fs.unlinkSync(rawPath)
        fs.unlinkSync(finalPath)
        delete videoData[sender]
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } })

    } catch (err) {
        console.error("VIDEO HD ERROR:", err)
        reply(`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❌ Video processing error!\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`)
    }
})

// Button Handler - Audio (MP3)
cmd({
    pattern: "video_audio",
    react: "🎵",
    desc: "Download as Audio",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, reply, sender }) => {
    try {
        const data = videoData[sender]
        if (!data || !data.videos) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Session expired! Please use .video again.
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            )
        }

        const vid = data.videos[data.selected]
        await conn.sendMessage(from, { react: { text: '🎵', key: m.key } })

        // Processing message
        await conn.sendMessage(from, {
            text: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* 🎵 *Extracting audio...*\n*│* 🎬 ${vid.title}\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        }, { quoted: mek })

        // Audio API
        const api = `https://arslan-apis.vercel.app/download/ytmp3?url=${encodeURIComponent(vid.url)}`
        const res = await axios.get(api, { timeout: 60000 })

        if (!res.data?.status || !res.data?.result?.download?.url) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Audio download error!
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            )
        }

        const audioUrl = res.data.result.download.url
        const meta = res.data.result.metadata

        const caption = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎵 *AUDIO DOWNLOADED*
*│*
*│* 🎶 *Title:* ${meta.title}
*│* 📀 *Quality:* 128kbps
*│* 📁 *Format:* MP3
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`

        await conn.sendMessage(from, {
            audio: { url: audioUrl },
            mimetype: "audio/mpeg",
            caption,
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
        }, { quoted: mek })

        delete videoData[sender]
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } })

    } catch (err) {
        console.error("VIDEO AUDIO ERROR:", err)
        reply(`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❌ Audio extraction error!\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`)
    }
})

// Button Handler - Document
cmd({
    pattern: "video_doc",
    react: "📁",
    desc: "Download as Document",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, reply, sender }) => {
    try {
        const data = videoData[sender]
        if (!data || !data.videos) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Session expired! Please use .video again.
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            )
        }

        const vid = data.videos[data.selected]
        await conn.sendMessage(from, { react: { text: '📁', key: m.key } })

        // Processing message
        await conn.sendMessage(from, {
            text: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* 📁 *Preparing document...*\n*│* 🎬 ${vid.title}\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        }, { quoted: mek })

        // API
        const api = `https://arslan-apis.vercel.app/download/ytmp4?url=${encodeURIComponent(vid.url)}`
        const res = await axios.get(api, { timeout: 60000 })

        if (!res.data?.status || !res.data?.result?.download?.url) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Download error!
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            )
        }

        const videoUrl = res.data.result.download.url
        const meta = res.data.result.metadata

        // temp folder
        const tempDir = path.join(__dirname, '../temp')
        if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true })

        const rawPath = path.join(tempDir, `doc_${Date.now()}.mp4`)

        // Download video
        const stream = await axios({
            url: videoUrl,
            method: "GET",
            responseType: "stream",
            timeout: 120000
        })

        await new Promise((resolve, reject) => {
            const w = fs.createWriteStream(rawPath)
            stream.data.pipe(w)
            w.on("finish", resolve)
            w.on("error", reject)
        })

        const caption = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📁 *DOCUMENT READY*
*│*
*│* 📽️ *Title:* ${meta.title}
*│* 📦 *Format:* MP4 Document
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`

        await conn.sendMessage(from, {
            document: fs.readFileSync(rawPath),
            mimetype: "video/mp4",
            fileName: `${meta.title}.mp4`,
            caption,
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
        }, { quoted: mek })

        // cleanup
        fs.unlinkSync(rawPath)
        delete videoData[sender]
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } })

    } catch (err) {
        console.error("VIDEO DOC ERROR:", err)
        reply(`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❌ Document preparation error!\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`)
    }
})