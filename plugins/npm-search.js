const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "npm",
  alias: ["npmpkg", "package"],
  desc: "Search for a package on npm.",
  react: '📦',
  category: "utility",
  filename: __filename,
  use: ".npm <package-name>"
}, async (conn, mek, msg, { from, args, reply, sender }) => {
  try {
    // Check if a package name is provided
    if (!args.length) {
      return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📦 *NPM SEARCH*
*│*
*│* ❌ Please provide a package name!
*│*
*│* 📝 *Example:* .npm express
*│* 📝 *Example:* .npm axios
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }

    const packageName = args.join(" ");
    
    // Add reaction
    await conn.sendMessage(from, { react: { text: '📦', key: mek.key } });

    const apiUrl = `https://registry.npmjs.org/${encodeURIComponent(packageName)}`;

    // Fetch package details from npm registry
    const response = await axios.get(apiUrl);
    if (response.status !== 200) {
      throw new Error("Package not found or an error occurred.");
    }

    const packageData = response.data;
    const latestVersion = packageData["dist-tags"]?.latest || "Unknown";
    const description = packageData.description || "No description available.";
    const npmUrl = `https://www.npmjs.com/package/${packageName}`;
    const license = packageData.license || "Unknown";
    const repository = packageData.repository?.url || "Not available";
    const homepage = packageData.homepage || npmUrl;
    const author = packageData.author?.name || packageData.maintainers?.[0]?.name || "Unknown";
    const keywords = packageData.keywords?.slice(0, 5).join(", ") || "None";
    const weeklyDownloads = "Check on npm"; // Could add download API later

    // Create the response message
    const message = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📦 *NPM PACKAGE INFO*
*│*
*│* 🔰 *Package:* ${packageName}
*│* 📄 *Description:* ${description}
*│* ⏸️ *Latest Version:* ${latestVersion}
*│* 👤 *Author:* ${author}
*│* 🪪 *License:* ${license}
*│* 🏷️ *Keywords:* ${keywords}
*│* 🪩 *Repository:* ${repository}
*│* 🔗 *NPM URL:* ${npmUrl}
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

    // Send the message
    await conn.sendMessage(from, { 
      text: message,
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

    // Success reaction
    await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

  } catch (error) {
    console.error("NPM Error:", error);

    // Send error message
    const errorMessage = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📦 *NPM SEARCH*
*│*
*│* ❌ *Package not found!*
*│* Package *"${args.join(" ")}"* does not exist.
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

    await conn.sendMessage(from, { text: errorMessage }, { quoted: mek });
    await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
  }
});