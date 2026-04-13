const { cmd } = require("../command");
const fetch = require("node-fetch");

cmd({
  pattern: "gitclone",
  alias: ["git", "github", "repo", "clone"],
  desc: "Download GitHub repository as zip file",
  react: "📦",
  category: "downloader",
  use: ".gitclone <github_url>",
  filename: __filename
}, async (conn, m, store, { from, args, reply, sender }) => {
  try {
    if (!args[0]) {
      return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📦 *GITCLONE COMMAND*
*│*
*│* ❌ GitHub link missing!
*│*
*│* 📝 *Example:*
*│* .gitclone https://github.com/user/repo
*│* .gitclone user/repo
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }

    // Add reaction
    await conn.sendMessage(from, { react: { text: "📦", key: m.key } });

    let repoUrl = args[0];
    
    // Handle "user/repo" format
    if (!repoUrl.includes("github.com")) {
      if (repoUrl.includes("/")) {
        repoUrl = `https://github.com/${repoUrl}`;
      } else {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📦 *GITCLONE COMMAND*
*│*
*│* ❌ Invalid GitHub repository!
*│*
*│* 📝 *Valid formats:*
*│* • https://github.com/user/repo
*│* • user/repo
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
      }
    }

    // Validate GitHub URL
    const githubRegex = /github\.com\/([^\/]+)\/([^\/\s]+)/i;
    const match = repoUrl.match(githubRegex);
    
    if (!match) {
      return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📦 *GITCLONE COMMAND*
*│*
*│* ❌ Invalid GitHub repository link!
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }

    const username = match[1];
    const repo = match[2].replace(".git", "");
    const zipUrl = `https://api.github.com/repos/${username}/${repo}/zipball`;

    // Check if repository exists
    try {
      const head = await fetch(zipUrl, { method: "HEAD" });
      if (!head.ok) {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📦 *GITCLONE COMMAND*
*│*
*│* ❌ Repository not found or is private!
*│*
*│* 🔍 *Searched:* ${username}/${repo}
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
      }
    } catch (checkError) {
      return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📦 *GITCLONE COMMAND*
*│*
*│* ❌ Failed to check repository!
*│* Check your internet connection.
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }

    const fileName = `${repo}.zip`;

    // Processing message
    await conn.sendMessage(from, {
      text: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📦 *GITCLONE DOWNLOAD*
*│*
*│* 📁 *Repository:* ${username}/${repo}
*│* 🔗 *URL:* ${repoUrl}
*│*
*│* ⏳ *Downloading ZIP file...*
*│* Please wait...
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
    }, { quoted: m });

    // Send the zip file
    await conn.sendMessage(from, {
      document: { url: zipUrl },
      fileName: fileName,
      mimetype: "application/zip",
      caption: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ✅ *Download Complete!*
*│* 📦 ${username}/${repo}
*│* 📁 ${fileName}
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`,
      contextInfo: {
        mentionedJid: [sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363424043617436@newsletter",
          newsletterName: "MUZAMMIL-MD",
          serverMessageId: 143
        }
      }
    }, { quoted: m });

    // Success reaction
    await conn.sendMessage(from, { react: { text: "✅", key: m.key } });

  } catch (err) {
    console.error("GITCLONE ERROR:", err);
    reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📦 *GITCLONE COMMAND*
*│*
*│* ❌ *Error:* ${err.message}
*│*
*│* ⏳ Try again later!
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
    );
  }
});