const fs = require("fs");
const config = require("../config");
const { cmd, commands } = require("../command");
const path = require('path');
const axios = require("axios");

// =============================================
// PRIVACY MENU
// =============================================
cmd({
    pattern: "privacy",
    alias: ["privacymenu", "priv"],
    desc: "Privacy settings menu",
    category: "privacy",
    react: "🔐",
    filename: __filename
}, 
async (conn, mek, m, { from, reply, sender }) => {
    try {
        let privacyMenu = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🔐 *PRIVACY SETTINGS*
*│*
*│* 📋 *Commands:*
*│* • .blocklist - View blocked users
*│* • .getbio @user - Get user's bio
*│* • .setppall <option> - Profile pic privacy
*│* • .setonline <option> - Online privacy
*│* • .setpp - Change bot's profile pic
*│* • .setmyname <name> - Change bot's name
*│* • .updatebio <text> - Change bot's bio
*│* • .groupsprivacy <option> - Group add privacy
*│* • .getprivacy - View privacy settings
*│* • .getpp @user - Get profile picture
*│*
*│* ⚙️ *Options:*
*│* • all - Everyone
*│* • contacts - My contacts only
*│* • contact_blacklist - Contacts except blocked
*│* • none - Nobody
*│* • match_last_seen - Match last seen
*│*
*│* ⚠️ *Note:* Most commands are owner-only
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/s3cve5.jpg` },
                caption: privacyMenu,
                contextInfo: {
                    mentionedJid: [sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363424043617436@newsletter',
                        newsletterName: "MUZAMMIL-MD",
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❌ Error: ${e.message}\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`);
    }
});

// =============================================
// BLOCKLIST
// =============================================
cmd({
    pattern: "blocklist",
    desc: "View the list of blocked users.",
    category: "privacy",
    react: "📋",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* 📛 You are not the owner!\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*");

    try {
        const blockedUsers = await conn.fetchBlocklist();

        if (blockedUsers.length === 0) {
            return reply("*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* 📋 Your block list is empty.\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*");
        }

        let list = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* 📋 *BLOCKED USERS (${blockedUsers.length})*\n*│*\n`;
        blockedUsers.forEach((user, i) => {
            list += `*│* ${i+1}. @${user.split('@')[0]}\n`;
        });
        list += `*│*\n*│* 📌 *Powered by MUZAMMIL-MD*\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

        await conn.sendMessage(from, { 
            text: list,
            mentions: blockedUsers
        }, { quoted: mek });

    } catch (err) {
        console.error(err);
        reply(`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❌ Failed to fetch block list: ${err.message}\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`);
    }
});

// =============================================
// GET BIO
// =============================================
cmd({
    pattern: "getbio",
    alias: ["bio"],
    desc: "Get any user's bio",
    category: "privacy",
    react: "📝",
    filename: __filename
}, async (conn, mek, m, { from, reply, sender }) => {
    try {
        let target = m.quoted ? m.quoted.sender : m.mentionedJid?.[0] || sender;

        if (!target) {
            return reply("*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❌ Mention or reply to a user!\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*");
        }

        const bio = await conn.fetchStatus(target).catch(() => null);

        if (!bio?.status) {
            return reply("*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* 🔒 User has no bio or it's hidden.\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*");
        }

        const msg = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* 📝 *BIO:* ${bio.status}\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

        await conn.sendMessage(from, { 
            text: msg,
            mentions: [target]
        }, { quoted: mek });

    } catch (err) {
        console.error(err);
        reply(`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❌ Failed to fetch bio\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`);
    }
});

// =============================================
// SET PROFILE PIC PRIVACY
// =============================================
cmd({
    pattern: "setppall",
    desc: "Update Profile Picture Privacy",
    category: "privacy",
    react: "🔐",
    filename: __filename
}, 
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❌ You are not the owner!\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*");
    
    try {
        const value = args[0] || 'all'; 
        const validValues = ['all', 'contacts', 'contact_blacklist', 'none'];  
        
        if (!validValues.includes(value)) {
            return reply("*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❌ Invalid option. Use: all, contacts, contact_blacklist, none\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*");
        }
        
        await conn.updateProfilePicturePrivacy(value);
        reply(`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ✅ Profile picture privacy set to: *${value}*\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`);
    } catch (e) {
        reply(`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❌ Error: ${e.message}\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`);
    }
});

// =============================================
// SET ONLINE PRIVACY
// =============================================
cmd({
    pattern: "setonline",
    desc: "Update Online Privacy",
    category: "privacy",
    react: "🔐",
    filename: __filename
}, 
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❌ You are not the owner!\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*");

    try {
        const value = args[0] || 'all'; 
        const validValues = ['all', 'match_last_seen'];
        
        if (!validValues.includes(value)) {
            return reply("*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❌ Invalid option. Use: all, match_last_seen\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*");
        }

        await conn.updateOnlinePrivacy(value);
        reply(`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ✅ Online privacy set to: *${value}*\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`);
    } catch (e) {
        reply(`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❌ Error: ${e.message}\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`);
    }
});

// =============================================
// SET PROFILE PIC
// =============================================
cmd({
    pattern: "setpp",
    desc: "Set bot profile picture.",
    category: "privacy",
    react: "🖼️",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❌ You are not the owner!\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*");
    if (!quoted || !quoted.message.imageMessage) return reply("*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❌ Please reply to an image.\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*");
    
    try {
        const { downloadContentFromMessage } = require("@whiskeysockets/baileys");
        const stream = await downloadContentFromMessage(quoted.message.imageMessage, 'image');
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        const mediaPath = path.join(__dirname, `${Date.now()}.jpg`);
        fs.writeFileSync(mediaPath, buffer);

        await conn.updateProfilePicture(conn.user.jid, { url: `file://${mediaPath}` });
        fs.unlinkSync(mediaPath);
        
        reply("*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* 🖼️ Profile picture updated successfully!\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*");
    } catch (error) {
        console.error("Error updating profile picture:", error);
        reply(`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❌ Error: ${error.message}\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`);
    }
});

// =============================================
// SET MY NAME
// =============================================
cmd({
    pattern: "setmyname",
    desc: "Set your WhatsApp display name.",
    category: "privacy",
    react: "⚙️",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply, args }) => {
    if (!isOwner) return reply("*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❌ You are not the owner!\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*");

    const displayName = args.join(" ");
    if (!displayName) return reply("*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❌ Please provide a display name.\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*");

    try {
        await conn.updateProfileName(displayName);
        reply(`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ✅ Display name set to: *${displayName}*\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`);
    } catch (err) {
        console.error(err);
        reply("*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❌ Failed to set display name.\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*");
    }
});

// =============================================
// UPDATE BIO
// =============================================
cmd({
    pattern: "updatebio",
    react: "📝",
    alias: ["setbio", "bio"],
    desc: "Change the Bot number Bio.",
    category: "privacy",
    use: '.updatebio <text>',
    filename: __filename
},
async (conn, mek, m, { from, q, isOwner, reply }) => {
    try {
        if (!isOwner) return reply("*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* 🚫 You must be an Owner!\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*");
        if (!q) return reply("*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❓ Enter the new bio.\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*");
        if (q.length > 139) return reply("*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❗ Character limit exceeded (max 139)\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*");
        
        await conn.updateProfileStatus(q);
        reply(`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ✅ Bio updated to: *${q}*\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`);
    } catch (e) {
        reply(`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* 🚫 Error: ${e}\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`);
    }
});

// =============================================
// GROUPS PRIVACY
// =============================================
cmd({
    pattern: "groupsprivacy",
    desc: "Update Group Add Privacy",
    category: "privacy",
    react: "🔐",
    filename: __filename
}, 
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❌ You are not the owner!\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*");

    try {
        const value = args[0] || 'all'; 
        const validValues = ['all', 'contacts', 'contact_blacklist', 'none'];
        
        if (!validValues.includes(value)) {
            return reply("*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❌ Invalid option. Use: all, contacts, contact_blacklist, none\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*");
        }

        await conn.updateGroupsAddPrivacy(value);
        reply(`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ✅ Group add privacy set to: *${value}*\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`);
    } catch (e) {
        reply(`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❌ Error: ${e.message}\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`);
    }
});

// =============================================
// GET PRIVACY
// =============================================
cmd({
    pattern: "getprivacy",
    desc: "Get the bot Number Privacy Settings.",
    category: "privacy",
    react: "🔍",
    use: '.getprivacy',
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    try {
        if (!isOwner) return reply("*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* 🚫 You must be an Owner!\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*");
        
        const duka = await conn.fetchPrivacySettings?.(true);
        if (!duka) return reply("*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* 🚫 Failed to fetch privacy settings\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*");
        
        let puka = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🔐 *PRIVACY SETTINGS*
*│*
*│* 📖 Read Receipt: ${duka.readreceipts}
*│* 🖼️ Profile Picture: ${duka.profile}
*│* 📝 Status: ${duka.status}
*│* 🟢 Online: ${duka.online}
*│* 👁️ Last Seen: ${duka.last}
*│* 👥 Group Privacy: ${duka.groupadd}
*│* 📞 Call Privacy: ${duka.calladd}
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;
        
        await conn.sendMessage(from, { text: puka }, { quoted: mek });
    } catch (e) {
        reply(`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* 🚫 Error: ${e}\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`);
    }
});

// =============================================
// GET PROFILE PICTURE
// =============================================
cmd({
    pattern: "getpp",
    alias: ["pp", "profilepic"],
    desc: "Get profile picture of mentioned/replied user",
    category: "privacy",
    react: "🖼️",
    filename: __filename
}, async (conn, mek, m, { from, reply, sender }) => {
    try {
        let target = m.quoted ? m.quoted.sender : m.mentionedJid?.[0] || sender;
        
        if (!target) {
            return reply("*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❌ Mention a user or reply to their message\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*");
        }
        
        let ppUrl;
        try {
            ppUrl = await conn.profilePictureUrl(target, "image");
        } catch {
            return reply("*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* 🖼️ No profile picture found.\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*");
        }
        
        await conn.sendMessage(from, {
            image: { url: ppUrl },
            caption: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* 🖼️ *Profile Picture*\n*│* 👤 @${target.split('@')[0]}\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`,
            mentions: [target]
        }, { quoted: mek });
        
    } catch (error) {
        console.error("[PP ERROR]", error);
        reply("*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❌ Failed to fetch profile picture\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*");
    }
});