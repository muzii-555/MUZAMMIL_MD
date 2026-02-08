const os = require('os');
const config = require('../config');
const { cmd } = require('../command');

// Legendary name rotations
const botNameStyles = [
  "𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋-𝐌𝐃",
  "𝕄𝕌ℤ𝔸𝕄𝕄𝕀𝕃-𝕄𝔻",
  "𝓜𝓤𝓩𝓐𝓜𝓜𝓘𝓛-𝓜𝓓",
  "ⱮԱɀȺⱮⱮįꝈ-ⱮᎠ",
  "爪ㄩ乙卂爪爪丨ㄥ-爪ᗪ"
];

let index = 0;

cmd({
  pattern: "ping",
  alias: ["speed","alive","status"],
  desc: "Legendary cinematic ping",
  category: "main",
  react: "⚡",
  filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
  try {
    // 1️⃣ PINGING phase
    const pingingMsg = await conn.sendMessage(from, {
      text: "*⚡ P I N G I N G . . .*"
    }, { quoted: mek });

    const start = Date.now();

    // Small cinematic delay
    await new Promise(res => setTimeout(res, 600));

    // 2️⃣ Calculate ping
    const ping = Date.now() - start;

    const uptime = process.uptime();
    const upM = Math.floor(uptime / 60);
    const ram = (process.memoryUsage().rss / 1024 / 1024).toFixed(1);

    const fancyName = botNameStyles[index];
    index = (index + 1) % botNameStyles.length;

    const reacts = ['👑','⚡','🔥','💎','🚀','🌌'];
    const reactEmoji = reacts[Math.floor(Math.random() * reacts.length)];

    // React on pinging message
    await conn.sendMessage(from, {
      react: { text: reactEmoji, key: pingingMsg.key }
    });

    // 3️⃣ Legendary result
    const text = `
*╔═══〔 👑 𝐋𝐄𝐆𝐄𝐍𝐃𝐀𝐑𝐘 𝐏𝐈𝐍𝐆 〕═══╗*
*║ ⟬ ${fancyName} ⟭*
*║────────────────────────*
*║ ⚡ 𝐒𝐏𝐄𝐄𝐃   : ${ping}ms*
*║ 🟢 𝐒𝐓𝐀𝐓𝐔𝐒  : ONLINE*
*║ 🕒 𝐔𝐏𝐓𝐈𝐌𝐄 : ${upM} min*
*║ 🧠 𝐑𝐀𝐌     : ${ram} MB*
*║ 📦 𝐕𝐄𝐑𝐒𝐈𝐎𝐍 : v5.0.0*
*╚════════════════════════╝*

> 💎 ᴘᴏᴡᴇʀᴇᴅ ʙʏ **𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋-𝐌𝐃**
`;

    await conn.sendMessage(from, {
      text,
      contextInfo: {
        mentionedJid: [sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363403831162407@newsletter',
          newsletterName: "MUZAMMIL-MD LEGENDARY",
          serverMessageId: 888
        }
      }
    }, { quoted: pingingMsg });

  } catch (e) {
    console.log(e);
    reply("❌ Legendary ping failed");
  }
});
