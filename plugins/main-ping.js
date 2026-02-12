const { cmd } = require("../command");
const os = require("os");

function formatUptime(seconds) {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor(seconds % (3600 * 24) / 3600);
  const m = Math.floor(seconds % 3600 / 60);
  const s = Math.floor(seconds % 60);
  return `${d}d ${h}h ${m}m ${s}s`;
}

cmd({
  pattern: "ping",
  alias: ["speed", "pong", "godping"],
  react: "⚡",
  desc: "Activate God Mode Ping",
  category: "main",
  filename: __filename
},
async (conn, mek, m, { from }) => {
  try {

    const start = Date.now();

    // Step 1 – Boot Animation
    await conn.sendMessage(from, {
      text: "```⚡ Booting MUZAMMIL-MD God Engine...```"
    }, { quoted: m });

    await new Promise(r => setTimeout(r, 700));

    // Step 2 – Scanning Animation
    await conn.sendMessage(from, {
      text: "```🧬 Scanning System Resources...```"
    }, { quoted: m });

    await new Promise(r => setTimeout(r, 700));

    const end = Date.now();
    const speed = end - start;

    // System Info
    const uptime = formatUptime(process.uptime());
    const usedRam = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
    const totalRam = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
    const cpuModel = os.cpus()[0].model;
    const cpuCores = os.cpus().length;
    const platform = os.platform();
    const nodeVersion = process.version;

    // Final Legendary Output
    const result = `
╔═══〔 👑 𝗠𝗨𝗭𝗔𝗠𝗠𝗜𝗟-𝗠𝗗 𝗚𝗢𝗗 𝗠𝗢𝗗𝗘 〕═══╗
║ ⚡ 𝗦𝗣𝗘𝗘𝗗        : ${speed} ms
║ ⏳ 𝗨𝗣𝗧𝗜𝗠𝗘      : ${uptime}
║ 🧠 𝗥𝗔𝗠 𝗨𝗦𝗘𝗗    : ${usedRam} MB / ${totalRam} GB
║ 🖥 𝗣𝗟𝗔𝗧𝗙𝗢𝗥𝗠    : ${platform}
║ 🧬 𝗖𝗣𝗨         : ${cpuCores} Cores
║ 💻 𝗡𝗢𝗗𝗘        : ${nodeVersion}
║ 🔥 𝗦𝗧𝗔𝗧𝗨𝗦      : GOD MODE ACTIVE
╚══════════════════════════════╝

> 🚀 Powered By MUZAMMIL-MD 👑`;

    await conn.sendMessage(from, {
      text: result
    }, { quoted: m });

  } catch (error) {
    console.log("God Ping Error:", error);
    await conn.sendMessage(from, {
      text: "❌ God Mode Failed!"
    }, { quoted: m });
  }
});
