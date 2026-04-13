const fs = require('fs');
const path = require('path');
const { cmd } = require('../command');

// Safe fetch for all Node versions
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

cmd({
    pattern: "repo",
    alias: ["sc", "script", "info", "repository"],
    desc: "Fetch information about bot GitHub repository",
    react: "📦",
    category: "info",
    filename: __filename
}, async (conn, mek, m, { from, reply, sender }) => {

    const githubRepoURL = 'https://github.com/Muzammil-404/MUZAMMIL-MD';

    try {
        const match = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);
        if (!match) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📦 *REPOSITORY INFO*
*│*
*│* ❌ Invalid GitHub repository URL!
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        const username = match[1];
        const repoName = match[2];

        // Add reaction
        await conn.sendMessage(from, { react: { text: '📦', key: mek.key } });

        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
        if (!response.ok) throw new Error(`GitHub API Error: ${response.status}`);

        const repoData = await response.json();

        // Format dates
        const createdDate = new Date(repoData.created_at).toLocaleDateString();
        const updatedDate = new Date(repoData.updated_at).toLocaleDateString();
        const language = repoData.language || 'Not specified';
        const openIssues = repoData.open_issues_count;
        const defaultBranch = repoData.default_branch;
        const license = repoData.license?.name || 'No license';
        const size = (repoData.size / 1024).toFixed(2);

        const caption = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📦 *REPOSITORY INFO*
*│*
*│* 🤖 *Bot Name:* ${repoData.name}
*│* 👑 *Owner:* ${repoData.owner.login}
*│* ⭐ *Stars:* ${repoData.stargazers_count}
*│* 🍴 *Forks:* ${repoData.forks_count}
*│* 👀 *Watchers:* ${repoData.subscribers_count}
*│* 📝 *Description:* ${repoData.description || "No description"}
*│*
*│* ─── *📊 DETAILS* ───
*│*
*│* 💻 *Language:* ${language}
*│* ⚠️ *Open Issues:* ${openIssues}
*│* 🌿 *Default Branch:* ${defaultBranch}
*│* 📜 *License:* ${license}
*│* 📦 *Size:* ${size} MB
*│* 📅 *Created:* ${createdDate}
*│* 🔄 *Updated:* ${updatedDate}
*│*
*│* 🔗 *GitHub:* ${repoData.html_url}
*│*
*│* ⭐ *Star & Fork the Repo!*
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

        await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/s3cve5.jpg' },
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

        // Optional voice
        const audioPath = path.join(__dirname, '../assets/menu.m4a');
        if (fs.existsSync(audioPath)) {
            await conn.sendMessage(from, {
                audio: fs.readFileSync(audioPath),
                mimetype: 'audio/mp4',
                ptt: false
            }, { quoted: mek });
        }

        // Success reaction
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

    } catch (err) {
        console.error("REPO ERROR:", err);
        reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📦 *REPOSITORY INFO*
*│*
*│* ❌ *Repo Fetch Failed!*
*│* ⏳ Try again later
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }
});