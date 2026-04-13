const { cmd } = require("../command");
const axios = require("axios");

/* ================= SEND IMAGE ================= */

cmd({
  pattern: "sendimage",
  alias: ["sendimg", "imgdl", "image"],
  react: "🖼️",
  desc: "Send image from URL",
  category: "downloader",
  filename: __filename
}, async (conn, mek, m, { from, q, reply, sender }) => {
  try {
    if (!q) {
      return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🖼️ *SEND IMAGE*
*│*
*│* ❌ Please provide an image URL!
*│*
*│* 📝 *Example:* .sendimage https://example.com/image.jpg
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }

    // Add reaction
    await conn.sendMessage(from, { react: { text: '🖼️', key: m.key } });

    const res = await axios.get(q, { responseType: "arraybuffer" });

    await conn.sendMessage(from, {
      image: Buffer.from(res.data),
      caption: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🖼️ *Image Downloaded Successfully!*
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`,
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
    console.error(e);
    reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🖼️ *SEND IMAGE*
*│*
*│* ❌ Image download failed!
*│* Please check the URL and try again.
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
    );
  }
});


/* ================= SEND AUDIO ================= */

cmd({
  pattern: "sendaudio",
  alias: ["sendmp3", "audio", "mp3"],
  react: "🎶",
  desc: "Send audio from URL",
  category: "downloader",
  filename: __filename
}, async (conn, mek, m, { from, q, reply, sender }) => {
  try {
    if (!q) {
      return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎶 *SEND AUDIO*
*│*
*│* ❌ Please provide an audio URL!
*│*
*│* 📝 *Example:* .sendaudio https://example.com/song.mp3
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }

    // Add reaction
    await conn.sendMessage(from, { react: { text: '🎶', key: m.key } });

    const res = await axios.get(q, { responseType: "arraybuffer" });

    await conn.sendMessage(from, {
      audio: Buffer.from(res.data),
      mimetype: "audio/mpeg",
      ptt: false,
      caption: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* 🎶 Audio Downloaded!\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`,
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
    console.error(e);
    reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎶 *SEND AUDIO*
*│*
*│* ❌ Audio download failed!
*│* Please check the URL and try again.
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
    );
  }
});


/* ================= SEND VIDEO ================= */

cmd({
  pattern: "sendvideo",
  alias: ["sendmp4", "video", "mp4"],
  react: "🎥",
  desc: "Send video from URL",
  category: "downloader",
  filename: __filename
}, async (conn, mek, m, { from, q, reply, sender }) => {
  try {
    if (!q) {
      return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎥 *SEND VIDEO*
*│*
*│* ❌ Please provide a video URL!
*│*
*│* 📝 *Example:* .sendvideo https://example.com/video.mp4
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }

    // Add reaction
    await conn.sendMessage(from, { react: { text: '🎥', key: m.key } });

    await conn.sendMessage(from, {
      video: { url: q },
      mimetype: "video/mp4",
      caption: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎥 *Video Downloaded Successfully!*
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`,
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
    console.error(e);
    reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎥 *SEND VIDEO*
*│*
*│* ❌ Video send failed!
*│* Please check the URL and try again.
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
    );
  }
});