const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "srepo",
  alias: ["searchrepo", "gitrepo", "repoinfo"],
  desc: "Get GitHub repository full details",
  category: "search",
  react: "📁",
  filename: __filename
}, async (conn, m, store, { from, args, reply, sender }) => {
  try {
    const repoName = args.join(" ");
    if (!repoName) {
      return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📁 *GITHUB REPO SEARCH*
*│*
*│* ❌ Please provide a repository name!
*│*
*│* 📝 *Example:* .srepo WhiskeySockets/Baileys
*│* 📝 *Example:* .srepo nodejs/node
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }

    // Add reaction
    await conn.sendMessage(from, { react: { text: '📁', key: m.key } });

    const apiUrl = `https://api.github.com/repos/${repoName}`;
    const { data } = await axios.get(apiUrl, {
      headers: {
        "User-Agent": "MUZAMMIL-MD"
      }
    });

    // Get additional info
    const language = data.language || 'Not specified';
    const license = data.license?.name || 'No license';
    const openIssues = data.open_issues_count;
    const defaultBranch = data.default_branch;
    const size = (data.size / 1024).toFixed(2);
    const topics = data.topics?.slice(0, 5).join(', ') || 'None';
    const archived = data.archived ? 'Yes 📦' : 'No 🟢';

    const msg = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📁 *REPOSITORY INFO*
*│*
*│* 📦 *Repo:* ${data.name}
*│* 👤 *Owner:* ${data.owner.login}
*│* ⭐ *Stars:* ${data.stargazers_count.toLocaleString()}
*│* 🍴 *Forks:* ${data.forks_count.toLocaleString()}
*│* 👀 *Watchers:* ${data.subscribers_count || data.watchers_count}
*│*
*│* ─── *📊 DETAILS* ───
*│*
*│* 💻 *Language:* ${language}
*│* ⚠️ *Open Issues:* ${openIssues}
*│* 🌿 *Default Branch:* ${defaultBranch}
*│* 📜 *License:* ${license}
*│* 📦 *Size:* ${size} MB
*│* 🏷️ *Topics:* ${topics}
*│* 📦 *Archived:* ${archived}
*│*
*│* 📝 *Description:* ${data.description || "No description available"}
*│*
*│* 📅 *Created:* ${new Date(data.created_at).toLocaleDateString()}
*│* 🔄 *Updated:* ${new Date(data.updated_at).toLocaleDateString()}
*│*
*│* 🔗 *Link:* ${data.html_url}
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

    await conn.sendMessage(from, { 
      text: msg,
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
    }, { quoted: m });

    // Success reaction
    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

  } catch (error) {
    console.error("SREPO ERROR:", error);
    
    if (error.response?.status === 404) {
      return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📁 *GITHUB REPO SEARCH*
*│*
*│* ❌ Repository *"${args.join(" ")}"* not found!
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }
    
    reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📁 *GITHUB REPO SEARCH*
*│*
*│* ❌ Failed to fetch repository details!
*│* Please check the name and try again.
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
    );
  }
});