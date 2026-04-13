const axios = require("axios");
const { cmd } = require("../command");

// MUZAMMIL-MD stylish captions (ROTATING)
const fbTitles = [
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📥 *Facebook Video*
*│* ✅ *Download Successful*
*│* ⚡ *Quality: HD*
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`,

`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎬 *Facebook Video Ready*
*│* 🚀 *Fast Download*
*│* 📦 *No Watermark*
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
];

let fbTitleIndex = 0;
let videoData = {};

cmd({
  pattern: "fb",
  alias: ["facebook", "fbvideo"],
  react: "📥",
  desc: "Download Facebook videos",
  category: "download",
  use: ".fb <facebook url>",
  filename: __filename
}, async (conn, mek, m, { from, reply, args, q }) => {
  try {
    const fbUrl = args[0];

    if (!fbUrl || !fbUrl.includes("facebook.com")) {
      return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* ❌ *Invalid Facebook URL*
*│*
*│* ✎ *Example:*
*│* .fb https://facebook.com/xxxx
*│*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }

    await conn.sendMessage(from, { react: { text: "⏳", key: m.key } });

    await conn.sendMessage(from, {
      text:
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🔍 *Processing Link*
*│* 📥 *Fetching Video...*
*│*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
    }, { quoted: mek });

    // 🔥 ARSLAN FACEBOOK API
    const apiUrl = `https://arslan-apis.vercel.app/download/facebook?url=${encodeURIComponent(fbUrl)}`;
    const { data } = await axios.get(apiUrl, { timeout: 30000 });

    if (!data || data.status !== true || !data.download_url) {
      return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* ❌ *Download Failed*
*│* ⚠️ Video may be private
*│*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }

    // Store video data
    videoData[from] = {
      url: data.download_url,
      title: data.title || "Facebook Video",
      quality: data.quality || "HD"
    };

    // Send format selection buttons
    const buttonMessage = {
      text: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* ✅ *Video Ready!*
*│*
*│* 🎬 *Title:* ${data.title || "Facebook Video"}
*│* ⚡ *Quality:* ${data.quality || "HD"}
*│*
*│* 📌 *Select download format:*
*│*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`,
      footer: "MUZAMMIL-MD",
      buttons: [
        { buttonId: 'fb_video', buttonText: { displayText: '🎬 Video' }, type: 1 },
        { buttonId: 'fb_audio', buttonText: { displayText: '🎵 Audio' }, type: 1 },
        { buttonId: 'fb_document', buttonText: { displayText: '📁 Document' }, type: 1 }
      ],
      headerType: 1,
      viewOnce: true
    };

    await conn.sendMessage(from, buttonMessage, { quoted: mek });

  } catch (err) {
    console.error("FB ERROR:", err);
    reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* ❌ *Facebook Download Error*
*│* ⏳ Try again later
*│*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
    );
  }
});

// Button Handler for Facebook Download
cmd({
  pattern: "fb_video",
  react: "🎬",
  desc: "Send Facebook video as video",
  category: "download",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    const data = videoData[from];
    if (!data || !data.url) {
      return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* ❌ *Session Expired*
*│* Please use .fb command again
*│*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }

    await conn.sendMessage(from, { react: { text: "🎬", key: m.key } });

    const caption = fbTitles[fbTitleIndex];
    fbTitleIndex = (fbTitleIndex + 1) % fbTitles.length;

    await conn.sendMessage(from, {
      video: { url: data.url },
      caption: caption,
      mimetype: "video/mp4"
    }, { quoted: mek });

    await conn.sendMessage(from, { react: { text: "✅", key: m.key } });
    delete videoData[from];

  } catch (err) {
    console.error("FB VIDEO ERROR:", err);
    reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* ❌ *Video Download Error*
*│*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
    );
  }
});

cmd({
  pattern: "fb_audio",
  react: "🎵",
  desc: "Send Facebook video as audio",
  category: "download",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    const data = videoData[from];
    if (!data || !data.url) {
      return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* ❌ *Session Expired*
*│* Please use .fb command again
*│*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }

    await conn.sendMessage(from, { react: { text: "🎵", key: m.key } });

    const caption = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎵 *Facebook Audio*
*│* ✅ *Download Successful*
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

    await conn.sendMessage(from, {
      audio: { url: data.url },
      mimetype: "audio/mpeg",
      caption: caption
    }, { quoted: mek });

    await conn.sendMessage(from, { react: { text: "✅", key: m.key } });
    delete videoData[from];

  } catch (err) {
    console.error("FB AUDIO ERROR:", err);
    reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* ❌ *Audio Download Error*
*│*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
    );
  }
});

cmd({
  pattern: "fb_document",
  react: "📁",
  desc: "Send Facebook video as document",
  category: "download",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    const data = videoData[from];
    if (!data || !data.url) {
      return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* ❌ *Session Expired*
*│* Please use .fb command again
*│*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }

    await conn.sendMessage(from, { react: { text: "📁", key: m.key } });

    const caption = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📁 *Facebook Video (Document)*
*│* ✅ *Download Successful*
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

    await conn.sendMessage(from, {
      document: { url: data.url },
      mimetype: "video/mp4",
      fileName: `${data.title || "Facebook_Video"}.mp4`,
      caption: caption
    }, { quoted: mek });

    await conn.sendMessage(from, { react: { text: "✅", key: m.key } });
    delete videoData[from];

  } catch (err) {
    console.error("FB DOCUMENT ERROR:", err);
    reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* ❌ *Document Download Error*
*│*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
    );
  }
});