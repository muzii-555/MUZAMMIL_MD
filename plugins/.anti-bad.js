const { cmd } = require('../command');
const config = require("../config");

// Strike map for users
const strikes = {};
const MAX_STRIKES = 3;

// Helper function to check if user is owner
const isOwner = (sender) => {
    return sender === config.OWNER_NUMBER + "@s.whatsapp.net";
};

// ===================== ANTI-BAD WORD WITH AUTO-KICK =====================
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isGroup, isAdmins, isBotAdmins, reply, sender, pushName }) => {
    try {
        // Check if anti-bad word is enabled
        if (!config.ANTI_BAD_WORD || config.ANTI_BAD_WORD !== "true") return;
        if (!isGroup) return;
        
        // Check if user is admin OR owner - both should be exempt
        if (isAdmins || isOwner(sender)) return;
        
        // Bot must be admin to delete/kick
        if (!isBotAdmins) return;

        // Validate body
        if (!body || typeof body !== 'string') return;

        // Bad words list
        const badWords = [
            "wtf","mia","xxx","fuck","sex","fck","sx","fuk","sexx","fkk",
            "huththa","pakaya","ponnaya","hutto",
            "bitch","asshole","bastard","dick","pussy","cunt","motherfucker","nigga",
            "haram","kutta","kutte","bhosda","chutiya","madarchod","behenchod",
            "gaand","lund","bur","randi","pundai","oomai","punda","thevidiya",
            "bsdk","mc","bc","rand","bhenchod","madarchot","betichod","gandu",
            "lavde","chut","chutmarike","kamine","sala","harami"
        ];

        const text = body.toLowerCase().trim();
        
        // Check if message contains any bad word
        let foundWord = null;
        for (const word of badWords) {
            if (text.includes(word) || new RegExp(`\\b${word}\\b`, 'i').test(text)) {
                foundWord = word;
                break;
            }
        }
        
        if (!foundWord) return;

        console.log(`⚠️ Bad word detected: "${foundWord}" from ${pushName || 'Unknown'} (${sender})`);

        // ===== Delete the message =====
        try { 
            await conn.sendMessage(from, { delete: m.key }); 
        } catch (deleteError) {
            console.log("Could not delete message:", deleteError);
        }

        // ===== Strike system =====
        if (!strikes[sender]) {
            strikes[sender] = 0;
        }
        
        strikes[sender] = strikes[sender] + 1;
        const userStrikes = strikes[sender];

        // ===== Different warnings based on strike count =====
        if (userStrikes === 1) {
            // First strike - Friendly warning
            const friendlyMsg = `╭━━━━━━━━━━━━╮\n` +
                               `┃  👋 *FRIENDLY WARNING*  ┃\n` +
                               `╰━━━━━━━━━━━━╯\n\n` +
                               `🌸 *Hey @${sender.split('@')[0]}!*\n\n` +
                               `Aapne ek *prohibited word* use kiya hai: *"${foundWord}"*\n\n` +
                               `🤗 *Please* group rules follow karein aur aage se aise words use na karein.\n\n` +
                               `💝 *Strike ${userStrikes}/${MAX_STRIKES}*\n\n` +
                               `> *Group ki shanti ke liye dhanyavaad!* 🙏`;
            
            await conn.sendMessage(from, { 
                text: friendlyMsg, 
                mentions: [sender] 
            });
            
        } else if (userStrikes === 2) {
            // Second strike - Strict warning
            const strictMsg = `╔═══════◄••❀••►═══════╗\n` +
                             `⚠️ *FINAL WARNING* ⚠️\n` +
                             `╚═══════◄••❀••►═══════╝\n\n` +
                             `👤 *@${sender.split('@')[0]}*\n\n` +
                             `🚫 *Aapne dubara bad word use kiya:* "${foundWord}"\n\n` +
                             `❗ *Yeh aapki SECOND STRIKE hai!*\n` +
                             `📊 *Strikes: ${userStrikes}/${MAX_STRIKES}*\n\n` +
                             `🔥 *Ek aur baar aisa karne par aapko group se KICK kar diya jayega!*\n\n`;
            
            await conn.sendMessage(from, { 
                text: strictMsg, 
                mentions: [sender] 
            });
            
        } else if (userStrikes >= 3) {
            // Third strike - Auto-kick
            try {
                // Check if auto-kick is enabled
                if (config.ANTI_BAD_WORD_KICK === "true") {
                    // Kick the user
                    await conn.groupParticipantsUpdate(from, [sender], "remove");
                    
                    // Send kick notification
                    const kickMsg = `╔═══════◄••❀••►═══════╗\n` +
                                   `⛔ *USER KICKED* ⛔\n` +
                                   `╚═══════◄••❀••►═══════╝\n\n` +
                                   `👤 *@${sender.split('@')[0]}*\n\n` +
                                   `❌ *Is user ko group se KICK kar diya gaya!*\n\n` +
                                   `📊 *Reasons:*\n` +
                                   `• Multiple bad word violations\n` +
                                   `• 3 strikes completed\n` +
                                   `• Ignored warnings\n\n` +
                                   `> *Group rules ka palan karna zaroori hai*`;
                    
                    await conn.sendMessage(from, { 
                        text: kickMsg, 
                        mentions: [sender] 
                    });
                    
                    // Reset strikes after kick
                    strikes[sender] = 0;
                } else {
                    // If auto-kick is disabled, just give a very strict warning
                    const lastWarningMsg = `╔═══════◄••❀••►═══════╗\n` +
                                          `🔥 *FINAL WARNING* 🔥\n` +
                                          `╚═══════◄••❀••►═══════╝\n\n` +
                                          `👤 *@${sender.split('@')[0]}*\n\n` +
                                          `🚫 *Aapne 3 baar bad word use kiya!*\n` +
                                          `📊 *Strikes: 3/3*\n\n` +
                                          `⚠️ *Auto-kick disabled hai isliye aapko nahi kiya kick*\n\n` +
                                          `*LEKIN AGLE BAAR ADMIN ACTION LE SAKTE HAIN!*`;
                    
                    await conn.sendMessage(from, { 
                        text: lastWarningMsg, 
                        mentions: [sender] 
                    });
                }
            } catch (kickError) {
                console.error("Failed to kick user:", kickError);
                await conn.sendMessage(from, { 
                    text: `❌ User ko kick karne mein error aaya. Admin manually action le!`, 
                    mentions: [sender] 
                });
            }
        }

        // Log the action
        console.log(`⚠️ Anti-BadWord: ${pushName || 'Unknown'} (${sender}) used "${foundWord}" in ${from}. Strike: ${userStrikes}`);

    } catch (error) {
        console.error("Anti-BadWord System Error:", error);
    }
});

// ===================== ENABLE/DISABLE ANTI-BAD WORD =====================
cmd({
    pattern: "antilang",
    alias: ["antibadword", "antigali"],
    desc: "Enable/Disable anti-bad word system",
    category: "group",
    react: "🛡️",
    filename: __filename
}, async (conn, mek, m, { from, args, q, reply, isGroup, isAdmins, sender }) => {
    try {
        if (!isGroup) return reply("❌ This command only works in groups!");
        
        // Check if user is admin OR owner
        if (!isAdmins && !isOwner(sender)) return reply("❌ Only admins/owner can use this!");

        if (!q) {
            const status = config.ANTI_BAD_WORD === "true" ? "✅ *ENABLED*" : "❌ *DISABLED*";
            return reply(`🛡️ *Anti-Bad Word Status*\nCurrent: ${status}\n\nUse:\n.antilang on\n.antilang off`);
        }

        if (q.toLowerCase() === "on") {
            config.ANTI_BAD_WORD = "true";
            return reply(`╔═══════◄••❀••►═══════╗\n` +
                        `🛡️ *ANTI-BAD WORD ENABLED* 🛡️\n` +
                        `╚═══════◄••❀••►═══════╝\n\n` +
                        `✅ *System ab ENABLE ho gaya!*\n\n` +
                        `📊 *Rules:*\n` +
                        `• Bad words auto-delete honge\n` +
                        `• Strike system active\n` +
                        `• 3 strikes = auto-kick (if enabled)\n\n` +
                        `> *Group rules follow karein*`);
        } 
        if (q.toLowerCase() === "off") {
            config.ANTI_BAD_WORD = "false";
            return reply(`╔═══════◄••❀••►═══════╗\n` +
                        `🛡️ *ANTI-BAD WORD DISABLED* 🛡️\n` +
                        `╚═══════◄••❀••►═══════╝\n\n` +
                        `❌ *System ab DISABLE ho gaya!*\n\n` +
                        `> *Admin manually action le sakte hain*`);
        }

        return reply("❌ Invalid option! Use `.antilang on` or `.antilang off`");

    } catch (e) {
        console.error("AntiLang Command Error:", e);
        reply("❌ Error toggling anti-bad word.");
    }
});

// ===================== ENABLE/DISABLE AUTO-KICK =====================
cmd({
    pattern: "antikick",
    alias: ["setantikick"],
    desc: "Enable/Disable auto-kick for repeated bad words",
    category: "group",
    react: "🛡️",
    filename: __filename
}, async (conn, mek, m, { from, args, q, reply, isGroup, isAdmins, sender }) => {
    try {
        if (!isGroup) return reply("❌ This command only works in groups!");
        
        // Check if user is admin OR owner
        if (!isAdmins && !isOwner(sender)) return reply("❌ Only admins/owner can use this!");

        if (!q) {
            const status = config.ANTI_BAD_WORD_KICK === "true" ? "✅ *ENABLED*" : "❌ *DISABLED*";
            return reply(`🛡️ *Auto-Kick Status*\nCurrent: ${status}\n\nUse:\n.antikick on\n.antikick off`);
        }

        if (q.toLowerCase() === "on") {
            config.ANTI_BAD_WORD_KICK = "true";
            return reply(`╔═══════◄••❀••►═══════╗\n` +
                        `🛡️ *AUTO-KICK ENABLED* 🛡️\n` +
                        `╚═══════◄••❀••►═══════╝\n\n` +
                        `✅ *Auto-kick ab ENABLE ho gaya!*\n\n` +
                        `📊 *Rules:*\n` +
                        `• 1st strike: Friendly warning\n` +
                        `• 2nd strike: Final warning\n` +
                        `• 3rd strike: Auto-kick\n\n` +
                        `> *Group rules follow karein*`);
        } 
        if (q.toLowerCase() === "off") {
            config.ANTI_BAD_WORD_KICK = "false";
            return reply(`╔═══════◄••❀••►═══════╗\n` +
                        `🛡️ *AUTO-KICK DISABLED* 🛡️\n` +
                        `╚═══════◄••❀••►═══════╝\n\n` +
                        `❌ *Auto-kick ab DISABLE ho gaya!*\n\n` +
                        `⚠️ *Users ko 3 strikes ke baad bhi nahi kiya jayega kick*\n\n` +
                        `> *Admin manually action le sakte hain*`);
        }

        return reply("❌ Invalid option! Use `.antikick on` or `.antikick off`");

    } catch (e) {
        console.error("AntiKick Command Error:", e);
        reply("❌ Error toggling auto-kick.");
    }
});

// ===================== CHECK STRIKES COMMAND =====================
cmd({
    pattern: "mystrikes",
    alias: ["strikes"],
    desc: "Check your strikes count",
    category: "group",
    react: "👁️",
    filename: __filename
}, async (conn, mek, m, { from, sender, reply }) => {
    try {
        const userStrikes = strikes[sender] || 0;
        
        let strikeEmoji = "";
        if (userStrikes === 0) strikeEmoji = "🟢";
        else if (userStrikes === 1) strikeEmoji = "🟡";
        else if (userStrikes === 2) strikeEmoji = "🟠";
        else strikeEmoji = "🔴";
        
        const strikeMsg = `╔═══════◄••❀••►═══════╗\n` +
                         `📊 *YOUR STRIKES* 📊\n` +
                         `╚═══════◄••❀••►═══════╝\n\n` +
                         `${strikeEmoji} *Strikes: ${userStrikes}/${MAX_STRIKES}*\n\n` +
                         `• 0-1 strikes: Safe zone\n` +
                         `• 2 strikes: Final warning\n` +
                         `• 3 strikes: Auto-kick\n\n` +
                         `> *Be careful with your words!*`;
        
        reply(strikeMsg);
    } catch (e) {
        console.error("MyStrikes Command Error:", e);
        reply("❌ Error checking strikes.");
    }
});

// ===================== RESET STRIKES COMMAND (Admin/Owner only) =====================
cmd({
    pattern: "resetstrikes",
    alias: ["clearstrikes"],
    desc: "Reset strikes for a user",
    category: "group",
    react: "🔄",
    filename: __filename
}, async (conn, mek, m, { from, args, q, reply, isGroup, isAdmins, sender }) => {
    try {
        if (!isGroup) return reply("❌ This command only works in groups!");
        
        // Check if user is admin OR owner
        if (!isAdmins && !isOwner(sender)) return reply("❌ Only admins/owner can use this!");

        if (!q) {
            return reply("❌ Please mention user or provide number!\nExample: .resetstrikes @user");
        }

        // Extract mentioned user or number
        let targetUser = "";
        if (mek.message && mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo && mek.message.extendedTextMessage.contextInfo.mentionedJid) {
            targetUser = mek.message.extendedTextMessage.contextInfo.mentionedJid[0];
        } else if (m.mentionedJid && m.mentionedJid.length > 0) {
            targetUser = m.mentionedJid[0];
        } else {
            // Try to parse as number
            const number = q.replace(/[^0-9]/g, '');
            if (number) {
                targetUser = number + "@s.whatsapp.net";
            }
        }

        if (!targetUser) {
            return reply("❌ Invalid user! Please mention a user.");
        }

        if (strikes[targetUser] && strikes[targetUser] > 0) {
            const oldStrikes = strikes[targetUser];
            strikes[targetUser] = 0;
            
            await conn.sendMessage(from, { 
                text: `✅ *Strikes reset for @${targetUser.split('@')[0]}*\nOld strikes: ${oldStrikes}/${MAX_STRIKES}\nNew strikes: 0/${MAX_STRIKES}`,
                mentions: [targetUser]
            });
        } else {
            reply(`ℹ️ User has no strikes to reset.`);
        }

    } catch (e) {
        console.error("ResetStrikes Command Error:", e);
        reply("❌ Error resetting strikes.");
    }
});

// ===================== CHECK ALL STRIKES COMMAND (Admin only) =====================
cmd({
    pattern: "allstrikes",
    alias: ["liststrikes"],
    desc: "Check all users strikes",
    category: "group",
    react: "📊",
    filename: __filename
}, async (conn, mek, m, { from, reply, isGroup, isAdmins, sender }) => {
    try {
        if (!isGroup) return reply("❌ This command only works in groups!");
        
        // Check if user is admin OR owner
        if (!isAdmins && !isOwner(sender)) return reply("❌ Only admins/owner can use this!");

        const activeStrikes = Object.entries(strikes).filter(([_, count]) => count > 0);
        
        if (activeStrikes.length === 0) {
            return reply("📊 *No users have strikes currently.*");
        }

        let strikeList = "╔═══════◄••❀••►═══════╗\n";
        strikeList += "📊 *ALL STRIKES* 📊\n";
        strikeList += "╚═══════◄••❀••►═══════╝\n\n";

        activeStrikes.forEach(([user, count], index) => {
            const number = user.split('@')[0];
            let emoji = count === 1 ? "🟡" : count === 2 ? "🟠" : "🔴";
            strikeList += `${index + 1}. ${emoji} @${number}: ${count}/${MAX_STRIKES}\n`;
        });

        strikeList += `\n> *Total: ${activeStrikes.length} users*`;

        await conn.sendMessage(from, { 
            text: strikeList,
            mentions: activeStrikes.map(([user]) => user)
        });

    } catch (e) {
        console.error("AllStrikes Command Error:", e);
        reply("❌ Error fetching strikes list.");
    }
});
