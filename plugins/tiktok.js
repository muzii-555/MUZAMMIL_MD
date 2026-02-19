const { cmd } = require("../command");
const axios = require("axios");

cmd({
  pattern: "tt",
  alias: ["tiktok", "ttdl"],
  react: "💞",
  desc: "Premium TikTok Downloader",
  category: "download",
  filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
  try {

    if (!q) return reply("❌ Janu TikTok link to do na... 💔");

    // 💖 Romantic Processing Box
    let processing = `
*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ 💖 Janu ap ki video aa rahi he...*
*┇▸ 🎬 Ap ki video tayar ho rahi he...*
*┇▸ ⏳ Thora sa intezar karo na...*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
`;

    await conn.sendMessage(from, { text: processing }, { quoted: mek });
    await conn.sendMessage(from, { react: { text: "💘", key: mek.key } });

    // 🔐 Secure Base64 Encode
    const encodedUrl = Buffer.from(q).toString("base64");

    const api = `https://arslanmd-api.vercel.app/api/ttdl?url=${encodedUrl}`;
    const { data } = await axios.get(api);

    if (!data || data.status !== true || !data.result) {
      return reply("💔 Janu video nahi mili...");
    }

    const { title, caption, nowm, mp3, thumbnail } = data.result;

    // 🎭 Final Stylish Box
    let resultBox = `
*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ 💖 Janu ap ki video aa gayi*
*┇▸ 🎬 Title:* ${title || "Unknown"}
*┇▸ 📝 Caption:* ${caption || "No caption"}
*┇▸ 🔐 Mode:* Secure Base64
*┇▸ 🚀 Powered By:* MUZAMMIL-MD
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
`;

    // 📸 Thumbnail + Info
    await conn.sendMessage(from, {
      image: { url: thumbnail },
      caption: resultBox
    }, { quoted: mek });

    // 🎥 Send Video
    await conn.sendMessage(from, {
      video: { url: nowm }
    }, { quoted: mek });

    // 🎵 Send MP3
    await conn.sendMessage(from, {
      audio: { url: mp3 },
      mimetype: "audio/mpeg"
    }, { quoted: mek });

    await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });

  } catch (error) {
    console.log(error);
    reply("❌ System error... baad me try karo.");
  }
});
