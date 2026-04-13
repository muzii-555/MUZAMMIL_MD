const fs = require("fs");
const path = require("path");
const { cmd } = require("../command");

const OWNER_PATH = path.join(__dirname, "../lib/sudo.json");

// Ensure the sudo.json file exists
const ensureOwnerFile = () => {
  if (!fs.existsSync(OWNER_PATH)) {
    fs.writeFileSync(OWNER_PATH, JSON.stringify([]));
  }
};

// Command: Add a temporary owner
cmd({
    pattern: "setsudo",
    alias: ["sudo", "addowner", "addsudo"],
    desc: "Add a temporary owner",
    category: "owner",
    react: "👑",
    filename: __filename
}, async (conn, mek, m, { from, args, q, isCreator, reply, sender }) => {
    try {
        if (!isCreator) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 👑 *SET SUDO*
*│*
*│* ❌ This command can only be used by Owner!
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        ensureOwnerFile();

        // Identify the target user
        let target = m.mentionedJid?.[0] 
            || (m.quoted?.sender ?? null)
            || (args[0]?.replace(/[^0-9]/g, '') + "@s.whatsapp.net");

        if (!target) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 👑 *SET SUDO*
*│*
*│* ❌ Please provide a number or tag/reply a user!
*│*
*│* 📝 *Example:* .setsudo @user
*│* 📝 *Example:* .setsudo 923375626980
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        let owners = JSON.parse(fs.readFileSync(OWNER_PATH, "utf-8"));

        if (owners.includes(target)) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 👑 *SET SUDO*
*│*
*│* ❌ This user is already a Sudo Owner!
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        owners.push(target);
        const uniqueOwners = [...new Set(owners)];
        fs.writeFileSync(OWNER_PATH, JSON.stringify(uniqueOwners, null, 2));

        // Add reaction
        await conn.sendMessage(from, { react: { text: '👑', key: mek.key } });

        const successMsg = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 👑 *SET SUDO*
*│*
*│* ✅ *Successfully Added Sudo Owner!*
*│*
*│* 👤 *User:* @${target.split('@')[0]}
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/s3cve5.jpg" },
            caption: successMsg,
            contextInfo: {
                mentionedJid: [target, sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363424043617436@newsletter',
                    newsletterName: 'MUZAMMIL-MD',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

    } catch (err) {
        console.error(err);
        reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 👑 *SET SUDO*
*│*
*│* ❌ *Error:* ${err.message}
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }
});

// Command: Remove a temporary owner
cmd({
    pattern: "delsudo",
    alias: ["delowner", "deletesudo", "rmsudo"],
    desc: "Remove a temporary owner",
    category: "owner",
    react: "🗑️",
    filename: __filename
}, async (conn, mek, m, { from, args, q, isCreator, reply, sender }) => {
    try {
        if (!isCreator) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🗑️ *DEL SUDO*
*│*
*│* ❌ This command can only be used by Owner!
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        ensureOwnerFile();

        let target = m.mentionedJid?.[0] 
            || (m.quoted?.sender ?? null)
            || (args[0]?.replace(/[^0-9]/g, '') + "@s.whatsapp.net");

        if (!target) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🗑️ *DEL SUDO*
*│*
*│* ❌ Please provide a number or tag/reply a user!
*│*
*│* 📝 *Example:* .delsudo @user
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        let owners = JSON.parse(fs.readFileSync(OWNER_PATH, "utf-8"));

        if (!owners.includes(target)) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🗑️ *DEL SUDO*
*│*
*│* ❌ User not found in Sudo list!
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        const updated = owners.filter(x => x !== target);
        fs.writeFileSync(OWNER_PATH, JSON.stringify(updated, null, 2));

        // Add reaction
        await conn.sendMessage(from, { react: { text: '🗑️', key: mek.key } });

        const successMsg = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🗑️ *DEL SUDO*
*│*
*│* ✅ *Successfully Removed Sudo Owner!*
*│*
*│* 👤 *User:* @${target.split('@')[0]}
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/s3cve5.jpg" },
            caption: successMsg,
            contextInfo: {
                mentionedJid: [target, sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363424043617436@newsletter',
                    newsletterName: 'MUZAMMIL-MD',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

    } catch (err) {
        console.error(err);
        reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🗑️ *DEL SUDO*
*│*
*│* ❌ *Error:* ${err.message}
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }
});

// Command: List all temporary owners
cmd({
    pattern: "listsudo",
    alias: ["listowner", "sudolist"],
    desc: "List all temporary owners",
    category: "owner",
    react: "📋",
    filename: __filename
}, async (conn, mek, m, { from, isCreator, reply, sender }) => {
    try {
        if (!isCreator) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📋 *LIST SUDO*
*│*
*│* ❌ This command can only be used by Owner!
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        ensureOwnerFile();

        let owners = JSON.parse(fs.readFileSync(OWNER_PATH, "utf-8"));
        owners = [...new Set(owners)];

        if (owners.length === 0) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📋 *LIST SUDO*
*│*
*│* ❌ No Sudo Owners found!
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        // Add reaction
        await conn.sendMessage(from, { react: { text: '📋', key: mek.key } });

        let listMessage = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📋 *SUDO OWNERS LIST*
*│*
*│* 👑 *Total:* ${owners.length} Sudo Owner(s)
*│*\n`;

        owners.forEach((owner, i) => {
            listMessage += `*│* ${i + 1}. @${owner.split('@')[0]}\n`;
        });

        listMessage += `*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/s3cve5.jpg" },
            caption: listMessage,
            contextInfo: {
                mentionedJid: owners,
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363424043617436@newsletter',
                    newsletterName: 'MUZAMMIL-MD',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

    } catch (err) {
        console.error(err);
        reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📋 *LIST SUDO*
*│*
*│* ❌ *Error:* ${err.message}
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }
});