const { cmd, commands } = require('../command');
const fs = require('fs');
const path = require('path');

cmd({
    pattern: "get",
    alias: ["source", "js", "code", "fetch"],
    desc: "Fetch the full source code of a command",
    category: "owner",
    react: "📜",
    filename: __filename
},
async (conn, mek, m, { from, args, reply, isOwner }) => {
    try {
        if (!isOwner) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📜 *GET COMMAND*
*│*
*│* 🔒 *Owner Only!*
*│* You don't have permission!
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        if (!args[0]) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📜 *GET COMMAND*
*│*
*│* ❌ Please provide a command name!
*│*
*│* 📝 *Example:* .get alive
*│* 📝 *Example:* .get menu
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        const commandName = args[0].toLowerCase();
        const commandData = commands.find(cmd => 
            cmd.pattern === commandName || 
            (cmd.alias && cmd.alias.includes(commandName))
        );

        if (!commandData) {
            // Get list of available commands
            const availableCommands = commands.map(c => c.pattern).filter(Boolean).slice(0, 10).join(', ');
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📜 *GET COMMAND*
*│*
*│* ❌ Command *"${commandName}"* not found!
*│*
*│* 📋 *Available commands:* ${availableCommands}...
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        // Add reaction
        await conn.sendMessage(from, { react: { text: "📜", key: m.key } });

        // Get the command file path
        const commandPath = commandData.filename;

        // Get file stats
        const fileStats = fs.statSync(commandPath);
        const fileSize = (fileStats.size / 1024).toFixed(2);
        const lastModified = fileStats.mtime.toLocaleString();

        // Read the full source code
        const fullCode = fs.readFileSync(commandPath, 'utf-8');
        const lineCount = fullCode.split('\n').length;

        // Truncate long messages for WhatsApp
        let truncatedCode = fullCode;
        let isTruncated = false;
        if (truncatedCode.length > 3500) {
            truncatedCode = fullCode.substring(0, 3500);
            isTruncated = true;
        }

        // Formatted caption with truncated code
        const formattedCode = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📜 *COMMAND SOURCE*
*│*
*│* 🔖 *Command:* ${commandData.pattern}
*│* 📁 *File:* ${path.basename(commandPath)}
*│* 📏 *Lines:* ${lineCount}
*│* 📦 *Size:* ${fileSize} KB
*│* 📅 *Modified:* ${lastModified}
*│* 🏷️ *Category:* ${commandData.category || 'N/A'}
*│* 🔗 *Aliases:* ${commandData.alias?.join(', ') || 'None'}
*│*
*│* ─── *Source Code* ───
*│*
\`\`\`js
${truncatedCode}
\`\`\`
*│*
*│* ${isTruncated ? '📂 *Full file sent below!*' : '✅ *Complete code displayed!*'}
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

        // Send image with truncated source code
        await conn.sendMessage(from, { 
            image: { url: `https://files.catbox.moe/s3cve5.jpg` },
            caption: formattedCode,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363424043617436@newsletter',
                    newsletterName: 'MUZAMMIL-MD',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        // Send full source file
        const fileName = `${commandData.pattern}.js`;
        const tempPath = path.join(__dirname, fileName);
        fs.writeFileSync(tempPath, fullCode);

        const fileCaption = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* 📁 *Full Source File*
*│* 📜 Command: ${commandData.pattern}
*│* 📦 Size: ${fileSize} KB
*│* 📏 Lines: ${lineCount}
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

        await conn.sendMessage(from, { 
            document: fs.readFileSync(tempPath),
            mimetype: 'text/javascript',
            fileName: fileName,
            caption: fileCaption
        }, { quoted: mek });

        // Delete the temporary file
        fs.unlinkSync(tempPath);

        // Success reaction
        await conn.sendMessage(from, { react: { text: "✅", key: m.key } });

    } catch (e) {
        console.error("Error in .get command:", e);
        reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📜 *GET COMMAND*
*│*
*│* ❌ *Error:* ${e.message}
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }
});