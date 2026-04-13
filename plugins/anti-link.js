const { cmd } = require('../command');
const config = require("../config");

cmd({
  'on': "body"
}, async (conn, m, store, {
  from,
  body,
  sender,
  isGroup,
  isAdmins,
  isBotAdmins,
  reply
}) => {
  try {
    // Initialize warnings if not exists
    if (!global.warnings) {
      global.warnings = {};
    }

    // Only act in groups where bot is admin and sender isn't admin
    if (!isGroup || isAdmins || !isBotAdmins) {
      return;
    }

    // Check if anti-link is enabled in config
    if (config.ANTI_LINK !== 'true') {
      return;
    }

    // Comprehensive list of link patterns to detect
    const linkPatterns = [
      // WhatsApp links
      /https?:\/\/(?:chat\.|www\.)?whatsapp\.com\/\S+/gi,
      /https?:\/\/(?:api\.)?whatsapp\.com\/\S+/gi,
      /wa\.me\/\S+/gi,
      /channel\.me\/\S+/gi,
      
      // Telegram links
      /https?:\/\/(?:t\.|www\.)?(?:telegram\.me|telegram\.com)\/\S+/gi,
      /t\.me\/\S+/gi,
      
      // Social Media
      /https?:\/\/(?:www\.)?facebook\.com\/\S+/gi,
      /https?:\/\/(?:www\.)?fb\.com\/\S+/gi,
      /https?:\/\/(?:www\.)?instagram\.com\/\S+/gi,
      /https?:\/\/(?:www\.)?twitter\.com\/\S+/gi,
      /https?:\/\/(?:www\.)?x\.com\/\S+/gi,
      /https?:\/\/(?:www\.)?linkedin\.com\/\S+/gi,
      /https?:\/\/(?:www\.)?reddit\.com\/\S+/gi,
      /https?:\/\/(?:www\.)?discord\.(?:com|gg)\/\S+/gi,
      /https?:\/\/(?:www\.)?twitch\.tv\/\S+/gi,
      /https?:\/\/(?:www\.)?snapchat\.com\/\S+/gi,
      /https?:\/\/(?:www\.)?tiktok\.com\/\S+/gi,
      /https?:\/\/(?:www\.)?pinterest\.com\/\S+/gi,
      
      // Video Platforms
      /https?:\/\/(?:www\.)?youtube\.com\/\S+/gi,
      /https?:\/\/(?:www\.)?youtu\.be\/\S+/gi,
      /https?:\/\/(?:www\.)?vimeo\.com\/\S+/gi,
      /https?:\/\/(?:www\.)?dailymotion\.com\/\S+/gi,
      
      // Blogging/Content
      /https?:\/\/(?:www\.)?medium\.com\/\S+/gi,
      /https?:\/\/(?:www\.)?quora\.com\/\S+/gi,
      
      // Generic URL patterns
      /https?:\/\/\S+\.com\/\S+/gi,
      /https?:\/\/\S+\.org\/\S+/gi,
      /https?:\/\/\S+\.net\/\S+/gi,
      /https?:\/\/\S+\.io\/\S+/gi,
      /https?:\/\/\S+\.me\/\S+/gi,
      /https?:\/\/\S+\.gg\/\S+/gi
    ];

    // Check if message contains any forbidden links
    const containsLink = linkPatterns.some(pattern => pattern.test(body));

    // Only proceed if link is detected
    if (!containsLink) {
      return;
    }

    console.log(`⚠️ Link detected from @${sender.split('@')[0]} in group ${from}`);

    // Try to delete the message
    try {
      await conn.sendMessage(from, {
        delete: m.key
      });
      console.log(`✅ Message deleted: ${m.key.id}`);
    } catch (deleteError) {
      console.error("❌ Failed to delete message:", deleteError);
    }

    // Update warning count for user
    global.warnings[sender] = (global.warnings[sender] || 0) + 1;
    const warningCount = global.warnings[sender];
    const remainingWarnings = 3 - warningCount;

    // Handle warnings based on count
    if (warningCount < 3) {
      // Send warning message with new structure
      const warningMessage = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ ⚠️ ANTI-LINK WARNING*
*┇▸ 👤 USER:* @${sender.split('@')[0]}
*┇▸ 🔢 WARNING:* ${warningCount}/3
*┇▸ ⚡ REMAINING:* ${remainingWarnings}
*┇▸ 📋 REASON:* LINK SENDING
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ ⛔ SENDING LINKS IS STRICTLY*
*┇▸ ⛔ PROHIBITED IN THIS GROUP!*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

      await conn.sendMessage(from, {
        text: warningMessage,
        mentions: [sender]
      });
      
    } else if (warningCount === 3) {
      // Final warning before removal
      const finalWarningMessage = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ 🚨 FINAL WARNING!*
*┇▸ 👤 USER:* @${sender.split('@')[0]}
*┇▸ 🔢 WARNING:* 3/3
*┇▸ ⚡ REMAINING:* 0
*┇▸ 📋 REASON:* REPEATED LINK SENDING
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ ⛔ ONE MORE VIOLATION*
*┇▸ ⛔ WILL RESULT IN REMOVAL!*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

      await conn.sendMessage(from, {
        text: finalWarningMessage,
        mentions: [sender]
      });
      
    } else {
      // Remove user if they exceed warning limit
      const removalMessage = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ ❌ USER REMOVED*
*┇▸ 👤 USER:* @${sender.split('@')[0]}
*┇▸ 📊 WARNINGS:* ${warningCount}
*┇▸ 🚫 REASON:* EXCEEDED WARNING LIMIT
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ ⚠️ USER HAS BEEN REMOVED*
*┇▸ ⚠️ FROM THE GROUP*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

      await conn.sendMessage(from, {
        text: removalMessage,
        mentions: [sender]
      });
      
      try {
        await conn.groupParticipantsUpdate(from, [sender], "remove");
        console.log(`👋 User ${sender.split('@')[0]} removed from group`);
        delete global.warnings[sender];
      } catch (removeError) {
        console.error("❌ Failed to remove user:", removeError);
        reply("*❌ Failed to remove user. Please check bot permissions.*");
      }
    }

  } catch (error) {
    console.error("❌ Anti-link error:", error);
    reply("*❌ An error occurred while processing the message.*");
  }
});