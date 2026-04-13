const { cmd } = require('../command');
const axios = require('axios');

// Store temporary data for button responses
const ttData = {};

cmd({
    pattern: "tt",
    alias: ["tiktok", "ttdl", "tiktokdl"],
    react: "🎵",
    desc: "Download TikTok video with format options",
    category: "download",
    use: ".tt <tiktok url>",
    filename: __filename
},
async (conn, mek, m, { from, q, reply, sender }) => {
    try {
        if (!q || !q.includes("tiktok")) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎵 *TIKTOK DOWNLOADER*
*│*
*│* ❌ Invalid TikTok Link!
*│*
*│* 📝 *Example:* .tt https://vm.tiktok.com/xxxx
*│* 📝 *Example:* .tt https://www.tiktok.com/@user/video/123
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        // Add reaction
        await conn.sendMessage(from, { react: { text: '🎵', key: m.key } });

        // Processing message
        const processingMsg = await conn.sendMessage(from, {
            text: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ⏳ *Fetching TikTok video...*\n*│* 🔍 Please wait...\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        }, { quoted: mek });

        const apiUrl = `https://arslanmd-api.vercel.app/api/ttdl?url=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data.status || !data.result?.video) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎵 *TIKTOK DOWNLOADER*
*│*
*│* ❌ Download Failed!
*│* 🔒 Video may be private or expired.
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        // Store video data for button responses
        ttData[sender] = {
            url: q,
            videoUrl: data.result.video,
            audioUrl: data.result.audio || null,
            wmUrl: data.result.wm || data.result.watermark || null,
            author: data.result.author || "Unknown",
            title: data.result.title || "TikTok Video",
            timestamp: Date.now()
        };

        // Send preview and options buttons
        const buttonMessage = {
            image: { url: data.result.thumbnail || 'https://files.catbox.moe/s3cve5.jpg' },
            caption: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎵 *TIKTOK READY*
*│*
*│* 👤 *Author:* ${data.result.author || "Unknown"}
*│* 📝 *Title:* ${data.result.title || "TikTok Video"}
*│*
*│* 📌 *Select download option:*
*│*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`,
            footer: "MUZAMMIL-MD",
            buttons: [
                { buttonId: 'tt_nowm', buttonText: { displayText: '🎬 No Watermark' }, type: 1 },
                { buttonId: 'tt_wm', buttonText: { displayText: '📹 With Watermark' }, type: 1 },
                { buttonId: 'tt_audio', buttonText: { displayText: '🎵 Audio (MP3)' }, type: 1 }
            ],
            headerType: 4,
            viewOnce: true
        };

        await conn.sendMessage(from, buttonMessage, { quoted: mek });
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (e) {
        console.error("TIKTOK ERROR:", e);
        reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎵 *TIKTOK DOWNLOADER*
*│*
*│* ❌ Command Error! Please try again later.
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }
});

// Button Handler - No Watermark
cmd({
    pattern: "tt_nowm",
    react: "🎬",
    desc: "Download TikTok without watermark",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, reply, sender }) => {
    try {
        const data = ttData[sender];
        if (!data || !data.videoUrl) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Session expired! Please use .tt again.
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        await conn.sendMessage(from, { react: { text: '🎬', key: m.key } });

        const processingMsg = await conn.sendMessage(from, {
            text: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ⏳ *Downloading video (No Watermark)...*\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        }, { quoted: mek });

        const caption = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎬 *TIKTOK DOWNLOADED*
*│*
*│* 👤 *Author:* ${data.author}
*│* 📝 *Title:* ${data.title}
*│* 🎬 *Quality:* No Watermark
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

        await conn.sendMessage(from, {
            video: { url: data.videoUrl },
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
        }, { quoted: mek });

        delete ttData[sender];
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (e) {
        console.error("TT NOWM ERROR:", e);
        reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Failed to download video!
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }
});

// Button Handler - With Watermark
cmd({
    pattern: "tt_wm",
    react: "📹",
    desc: "Download TikTok with watermark",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, reply, sender }) => {
    try {
        const data = ttData[sender];
        if (!data || !data.videoUrl) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Session expired! Please use .tt again.
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        await conn.sendMessage(from, { react: { text: '📹', key: m.key } });

        const processingMsg = await conn.sendMessage(from, {
            text: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ⏳ *Downloading video (With Watermark)...*\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        }, { quoted: mek });

        // Use watermark URL if available, otherwise fallback to regular
        const videoUrl = data.wmUrl || data.videoUrl;

        const caption = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📹 *TIKTOK DOWNLOADED*
*│*
*│* 👤 *Author:* ${data.author}
*│* 📝 *Title:* ${data.title}
*│* 📹 *Quality:* With Watermark
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

        await conn.sendMessage(from, {
            video: { url: videoUrl },
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
        }, { quoted: mek });

        delete ttData[sender];
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (e) {
        console.error("TT WM ERROR:", e);
        reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Failed to download video!
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }
});

// Button Handler - Audio (MP3)
cmd({
    pattern: "tt_audio",
    react: "🎵",
    desc: "Download TikTok audio as MP3",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, reply, sender }) => {
    try {
        const data = ttData[sender];
        if (!data || !data.videoUrl) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Session expired! Please use .tt again.
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        await conn.sendMessage(from, { react: { text: '🎵', key: m.key } });

        const processingMsg = await conn.sendMessage(from, {
            text: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ⏳ *Downloading audio...*\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        }, { quoted: mek });

        // Use audio URL if available, otherwise try to fetch
        let audioUrl = data.audioUrl;
        
        if (!audioUrl) {
            // Try alternative API for audio
            try {
                const audioApi = `https://api.giftedtech.web.id/api/download/tiktokmp3?apikey=gifted&url=${encodeURIComponent(data.url)}`;
                const audioRes = await axios.get(audioApi);
                if (audioRes.data.success) {
                    audioUrl = audioRes.data.result.download_url;
                }
            } catch (e) {
                console.log("Audio API fallback failed");
            }
        }

        if (!audioUrl) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Audio not available for this video!
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        const caption = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎵 *TIKTOK AUDIO*
*│*
*│* 👤 *Author:* ${data.author}
*│* 📝 *Title:* ${data.title}
*│* 🎵 *Format:* MP3
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

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
        }, { quoted: mek });

        delete ttData[sender];
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (e) {
        console.error("TT AUDIO ERROR:", e);
        reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Failed to download audio!
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }
});