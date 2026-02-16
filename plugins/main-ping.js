const { cmd } = require("../command");
const os = require("os");

function formatUptime(seconds) {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${d}d ${h}h ${m}m ${s}s`;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

cmd({
  pattern: "ping",
  alias: ["speed", "pong", "godping"],
  react: "⚡",
  desc: "Ultra God Mode Ping",
  category: "main",
  filename: __filename
},
async (conn, mek, m, { from }) => {
  try {

    const start = Date.now();

    // Send Initial Message
    let msg = await conn.sendMessage(from, {
      text: "```⚡ Initializing MUZAMMIL-MD God Engine...```"
    }, { quoted: m });

    await delay(500);

    await conn.sendMessage(from, {
      text: "```🧬 Scanning System...```",
      edit: msg.key
    });

    await delay(500);

    const end = Date.now();
    const speed = end - start;

    // SYSTEM INFO
    const uptime = formatUptime(process.uptime());
    const usedRam = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
    const totalRam = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
    const freeRam = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);

    const cpus = os.cpus();
    const cpuModel = cpus[0].model;
    const cpuCores = cpus.length;

    const platform = os.platform().toUpperCase();
    const nodeVersion = process.version;

    const result = `
╔═══〔 👑 𝗠𝗨𝗭𝗔𝗠𝗠𝗜𝗟-𝗠𝗗 𝗨𝗟𝗧𝗥𝗔 𝗚𝗢𝗗 〕═══╗
║ ⚡ 𝗦𝗣𝗘𝗘𝗗        : ${speed} ms
║ ⏳ 𝗨𝗣𝗧𝗜𝗠𝗘      : ${uptime}
║ 🧠 𝗥𝗔𝗠 𝗨𝗦𝗘𝗗    : ${usedRam} MB
║ 💾 𝗙𝗥𝗘𝗘 𝗥𝗔𝗠    : ${freeRam} GB
║ 🖥 𝗣𝗟𝗔𝗧𝗙𝗢𝗥𝗠    : ${platform}
║ 🧬 𝗖𝗣𝗨         : ${cpuCores} Cores
║ 💻 𝗡𝗢𝗗𝗘        : ${nodeVersion}
║ 🔥 𝗦𝗧𝗔𝗧𝗨𝗦      : GOD MODE ACTIVE
╚══════════════════════════════╝

> 🚀 Powered By MUZAMMIL-MD 👑`;

    await conn.sendMessage(from, {
      text: result,
      edit: msg.key
    });

  } catch (error) {
    console.log("Ultra God Ping Error:", error);
    await conn.sendMessage(from, {
      text: "❌ God Mode System Crash!"
    }, { quoted: m });
  }
});
