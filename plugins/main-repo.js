const fetch = require('node-fetch');
const { cmd } = require('../command');

// 🎭 STYLISH BOT NAME SYSTEM (MUZAMMIL-MD)
const botNameStyles = [
    "𝓜𝓤𝓩𝓐𝓜𝓜𝓘𝓛-𝓜𝓓",
    "𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋-𝐌𝐃",
    "𝙈𝙐𝙕𝘼𝙈𝙈𝙄𝙇-𝙈𝘿",
    "𝗠𝗨𝗭𝗔𝗠𝗠𝗜𝗟-𝗠𝗗",
    "ᗰᑌᘔᗩᗰᗰIᒪ-ᗰᗪ",
    "🄼🅄🅉🄰🄼🄼🄸🄻-🄼🄳",
    "M⃟U⃟Z⃟A⃟M⃟M⃟I⃟L⃟-⃟M⃟D⃟",
    "ᴍᴜᴢᴀᴍᴍɪʟ-ᴍᴅ"
];

function getRandomBotName() {
    return botNameStyles[Math.floor(Math.random() * botNameStyles.length)];
}

// ⛔ GLOBAL LOCK
let isRepoLocked = false;
const REPO_LOCK_TIMEOUT = 5000;

cmd({
    pattern: "repo",
    alias: ["sc", "script", "source", "github", "code"],
    desc: "Get MUZAMMIL-MD repository information",
    react: "📂",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { from, reply, sender, pushname }) => {

    try {
        if (isRepoLocked) {
            await conn.sendMessage(from, {
                react: { text: '🚫', key: m.key }
            });
            return reply("⏸️ Command locked! Wait 5 seconds.");
        }

        isRepoLocked = true;
        setTimeout(() => { isRepoLocked = false }, REPO_LOCK_TIMEOUT);

        const botName = getRandomBotName();

        await conn.sendMessage(from, {
            react: { text: '⏳', key: m.key }
        });

        // 🔗 UPDATED REPO
        const githubRepoURL = 'https://github.com/muzii-555/MUZAMMIL_MD';
        const [, username, repoName] =
            githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/)
            || ['', 'muzii-555', 'MUZAMMIL_MD'];

        const response = await fetch(
            `https://api.github.com/repos/${username}/${repoName}`,
            {
                headers: {
                    'User-Agent': 'MUZAMMIL-MD',
                    'Accept': 'application/vnd.github.v3+json'
                }
            }
        );

        if (!response.ok)
            throw new Error(`GitHub API failed (${response.status})`);

        const repoData = await response.json();

        const borderLine = "═".repeat(34);

        const formattedInfo = `
╔${borderLine}╗
║        📂 ${botName} 📂        ║
╚${borderLine}╝

📦 *REPOSITORY INFORMATION*

┌─⭓ *Basic Details*
│ 📛 *Repository:* ${repoData.name}
│ 👤 *Owner:* @${repoData.owner?.login}
│ 📝 *Description:* ${repoData.description || 'MUZAMMIL-MD WhatsApp Bot'}
│ 🔗 *URL:* ${repoData.html_url}
│
├─⭓ *Statistics*
│ ⭐ *Stars:* ${repoData.stargazers_count}
│ 🍴 *Forks:* ${repoData.forks_count}
│ 👁️ *Watchers:* ${repoData.watchers_count}
│ 💻 *Language:* ${repoData.language || 'JavaScript'}
│ 📅 *Created:* ${new Date(repoData.created_at).toLocaleDateString()}
│ 🔄 *Updated:* ${new Date(repoData.updated_at).toLocaleDateString()}
│
├─⭓ *Technical*
│ 📏 *Size:* ${(repoData.size / 1024).toFixed(2)} MB
│ 🌿 *Branch:* ${repoData.default_branch}
│ 🔓 *Status:* ${repoData.private ? 'Private' : 'Public'}
│ 📊 *Issues:* ${repoData.open_issues_count}
│
└─⭓ *User*
│ 👤 *Requested by:* ${pushname}
│ 🆔 *User ID:* ${sender.split('@')[0]}
│ ⏰ *Time:* ${new Date().toLocaleTimeString()}

${borderLine}

⭐ Star • 🍴 Fork • 🔄 Stay Updated

⚡ Powered By ${botName}
`.trim();

        await conn.sendMessage(from, {
            image: {
                url: `https://files.catbox.moe/wcro3e.jpg`
            },
            caption: formattedInfo
        }, { quoted: mek });

        await conn.sendMessage(from, {
            react: { text: '✅', key: m.key }
        });

    } catch (error) {

        await conn.sendMessage(from, {
            react: { text: '❌', key: m.key }
        });

        reply(`❌ MUZAMMIL-MD Repo Fetch Failed\n\n${error.message}`);
    } finally {
        setTimeout(() => { isRepoLocked = false }, 1000);
    }
});
