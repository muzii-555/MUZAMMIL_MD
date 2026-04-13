const axios = require('axios');
const os = require('os');
const fs = require('fs');
const path = require('path');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');

cmd({
  pattern: 'version',
  alias: ["changelog", "cupdate", "checkupdate"],
  react: '🚀',
  desc: "Check bot's version, system stats, and update info.",
  category: 'info',
  filename: __filename
}, async (conn, mek, m, {
  from, sender, pushname, reply
}) => {
  try {
    // Read local version data
    const localVersionPath = path.join(__dirname, '../data/version.json');
    let localVersion = 'Unknown';
    let changelog = 'No changelog available.';
    if (fs.existsSync(localVersionPath)) {
      const localData = JSON.parse(fs.readFileSync(localVersionPath));
      localVersion = localData.version;
      changelog = localData.changelog;
    }

    // Fetch latest version data from GitHub
    const rawVersionUrl = 'https://raw.github.com';
    let latestVersion = 'Unknown';
    let latestChangelog = 'No changelog available.';
    try {
      const { data } = await axios.get(rawVersionUrl);
      latestVersion = data.version;
      latestChangelog = data.changelog;
    } catch (error) {
      console.error('Failed to fetch latest version:', error);
    }

    // Count total plugins
    const pluginPath = path.join(__dirname, '../plugins');
    const pluginCount = fs.readdirSync(pluginPath).filter(file => file.endsWith('.js')).length;

    // Count total registered commands
    const totalCommands = commands.length;

    // System info
    const uptime = runtime(process.uptime());
    const ramUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
    const totalRam = (os.totalmem() / 1024 / 1024).toFixed(2);
    const hostName = os.hostname();
    const lastUpdate = fs.statSync(localVersionPath).mtime.toLocaleString();

    // GitHub stats
    const githubRepo = 'https://github.com';

    // Check update status
    let updateMessage = `✅ Your *MUZAMMIL-MD* bot is up-to-date!`;
    if (localVersion !== latestVersion) {
      updateMessage = `🚀 Your *MUZAMMIL-MD* bot is outdated!\n🔹 *Current Version:* ${localVersion}\n🔹 *Latest Version:* ${latestVersion}\n\nUse *.update* to update.`;
    }

    const statusMessage = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│* 🌟 *Good ${new Date().getHours() < 12 ? 'Morning' : 'Night'}, ${pushname}!* 🌟
*│* 📌 *Bot Name:* *MUZAMMIL-MD*
*│* 🔖 *Current Version:* ${localVersion}
*│* 📢 *Latest Version:* ${latestVersion}
*│* 📂 *Total Plugins:* ${pluginCount}
*│* 🔢 *Total Commands:* ${totalCommands}
*│*
*│* 💾 *System Info:*
*│* ⏳ *Uptime:* ${uptime}
*│* 📟 *RAM Usage:* ${ramUsage}MB / ${totalRam}MB
*│* ⚙️ *Host Name:* ${hostName}
*│* 📅 *Last Update:* ${lastUpdate}
*│*
*│* 📝 *Changelog:*
*│* ${latestChangelog}
*│*
*│* ⭐ *GitHub Repo:* ${githubRepo}
*│* 👤 *Owner:* *MUZAMMIL*
*│*
*│* ${updateMessage}
*│*
*│* 🚀 *Hey! Don't forget to fork & star the repo!*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

    // Send the status message with an image
    await conn.sendMessage(from, {
      image: { url: 'https://files.catbox.moe/s3cve5.jpg' },
      caption: statusMessage,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '',
          newsletterName: 'MUZAMMIL-MD',
          serverMessageId: 143
        }
      }
    }, { quoted: mek });
  } catch (error) {
    console.error('Error fetching version info:', error);
    reply('❌ An error occurred while checking the bot version.');
  }
});