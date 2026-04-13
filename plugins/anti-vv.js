const { cmd } = require("../command");

// Enhanced View-Once Retriever with Emoji Commands
cmd({
  pattern: "vv",
  alias: [
    "viewonce", "retrive", "retrieve", "getvv", "savevv",
    "👀", "👁️", "🔍", "📸", "🎥", "🎵", "💾", "⬇️", "📥",
    "🖼️", "🎬", "🔊", "👻", "🕵️", "🤫", "🔐", "🔓",
    "✨", "🌟", "💫", "⭐", "🌈", "🎯", "💎", "🔥"
  ],
  react: '🐳',
  desc: "Owner Only - Retrieve view-once messages with emoji support",
  category: "owner",
  filename: __filename
}, async (client, message, match, { from, isCreator, sender, pushName }) => {
  try {
    // Owner check with custom response
    if (!isCreator) {
      const notOwnerMessages = [
        "*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*",
        "*┇▸ 🚫 ACCESS DENIED*",
        "*┇▸ 👤 USER:* " + (pushName || "Unknown"),
        "*┇▸ 🔒 OWNER ONLY COMMAND*",
        "*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*"
      ].join('\n');
      
      return await client.sendMessage(from, {
        text: notOwnerMessages
      }, { quoted: message });
    }

    // Check for quoted message
    if (!match.quoted) {
      const noQuotedMessages = [
        "*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*",
        "*┇▸ 📋 VIEW-ONCE RETRIEVER*",
        "*┇▸ ⚠️ NO MESSAGE QUOTED*",
        "*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*",
        "*┇▸ 💡 USAGE:*",
        "*┇▸ Reply to view-once message*",
        "*┇▸ Commands: .vv, .👀, .📸 etc*",
        "*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*"
      ].join('\n');
      
      return await client.sendMessage(from, {
        text: noQuotedMessages
      }, { quoted: message });
    }

    const quotedMsg = match.quoted;
    const msgType = quotedMsg.mtype;
    
    // Check if it's a view-once message
    const isViewOnce = quotedMsg.viewOnce || 
                      (quotedMsg.message?.imageMessage?.viewOnce) ||
                      (quotedMsg.message?.videoMessage?.viewOnce) ||
                      (quotedMsg.message?.audioMessage?.viewOnce);

    if (!isViewOnce) {
      const notViewOnceMessages = [
        "*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*",
        "*┇▸ ❌ NOT VIEW-ONCE*",
        "*┇▸ 📝 This message is not*",
        "*┇▸ 🔒 view-once protected*",
        "*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*"
      ].join('\n');
      
      return await client.sendMessage(from, {
        text: notViewOnceMessages
      }, { quoted: message });
    }

    // Show processing indicator
    await client.sendMessage(from, {
      react: { text: "⏳", key: message.key }
    });

    // Download the media
    const buffer = await quotedMsg.download();
    
    // Prepare options
    const options = { quoted: message };
    
    let messageContent = {};
    let fileEmoji = '';
    let fileType = '';
    let caption = quotedMsg.text || quotedMsg.caption || '';
    
    // Add watermark to caption
    const watermark = `\n\n*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*┇▸ 🔓 VIEW-ONCE RETRIEVED*\n*┇▸ 👑 BY OWNER*\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;
    const enhancedCaption = caption + watermark;

    switch (msgType) {
      case "imageMessage":
        messageContent = {
          image: buffer,
          caption: enhancedCaption,
          mimetype: quotedMsg.mimetype || "image/jpeg"
        };
        fileEmoji = '📸';
        fileType = 'IMAGE';
        break;
        
      case "videoMessage":
        messageContent = {
          video: buffer,
          caption: enhancedCaption,
          mimetype: quotedMsg.mimetype || "video/mp4",
          gifPlayback: quotedMsg.gifPlayback || false
        };
        fileEmoji = '🎥';
        fileType = 'VIDEO';
        break;
        
      case "audioMessage":
        messageContent = {
          audio: buffer,
          mimetype: quotedMsg.mimetype || "audio/mp4",
          ptt: quotedMsg.ptt || false
        };
        fileEmoji = '🎵';
        fileType = 'AUDIO';
        
        // Audio doesn't need caption
        if (messageContent.audio) {
          delete messageContent.caption;
        }
        break;
        
      default:
        // React with error
        await client.sendMessage(from, {
          react: { text: "❌", key: message.key }
        });
        
        const unsupportedMessages = [
          "*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*",
          "*┇▸ ❌ UNSUPPORTED TYPE*",
          "*┇▸ 📋 Only image, video & audio*",
          "*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*"
        ].join('\n');
        
        return await client.sendMessage(from, {
          text: unsupportedMessages
        }, { quoted: message });
    }

    // Send the retrieved content
    await client.sendMessage(from, messageContent, options);
    
    // React with success
    await client.sendMessage(from, {
      react: { text: "✅", key: message.key }
    });
    
    // Send success confirmation (auto-deletes after 5 seconds)
    const successMessage = [
      "*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*",
      `*┇▸ ${fileEmoji} ${fileType} RETRIEVED*`,
      "*┇▸ ✅ SUCCESSFULLY*",
      "*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*"
    ].join('\n');
    
    await client.sendMessage(from, {
      text: successMessage,
      ephemeralExpiration: 5 // Auto-delete after 5 seconds
    });
    
  } catch (error) {
    console.error("VV Error:", error);
    
    // React with error
    await client.sendMessage(from, {
      react: { text: "❌", key: message.key }
    });
    
    const errorMessages = [
      "*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*",
      "*┇▸ ❌ RETRIEVAL FAILED*",
      `*┇▸ ⚠️ ${error.message}*`,
      "*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*"
    ].join('\n');
    
    await client.sendMessage(from, {
      text: errorMessages
    }, { quoted: message });
  }
});

// Additional Emoji-Only Commands (Super Stealth)
const emojiCommands = [
  { emoji: "🖼️", type: "image" },
  { emoji: "🎬", type: "video" },
  { emoji: "🔊", type: "audio" },
  { emoji: "👁️‍🗨️", type: "all" },
  { emoji: "🔮", type: "all" },
  { emoji: "🎭", type: "all" },
  { emoji: "📎", type: "all" },
  { emoji: "🔗", type: "all" }
];

emojiCommands.forEach(({ emoji }) => {
  cmd({
    pattern: emoji,
    alias: [],
    react: emoji,
    desc: "Hidden View-Once Retriever",
    category: "hidden",
    filename: __filename
  }, async (client, message, match, { from, isCreator }) => {
    // Same functionality but completely hidden
    if (!isCreator) return;
    
    const quoted = match.quoted;
    if (!quoted) return;
    
    try {
      const isViewOnce = quoted.viewOnce || 
                        quoted.message?.imageMessage?.viewOnce ||
                        quoted.message?.videoMessage?.viewOnce ||
                        quoted.message?.audioMessage?.viewOnce;
      
      if (!isViewOnce) return;
      
      const buffer = await quoted.download();
      const mtype = quoted.mtype;
      
      let content = {};
      if (mtype === "imageMessage") {
        content = { image: buffer, caption: quoted.caption || '' };
      } else if (mtype === "videoMessage") {
        content = { video: buffer, caption: quoted.caption || '' };
      } else if (mtype === "audioMessage") {
        content = { audio: buffer, ptt: quoted.ptt || false };
      } else {
        return;
      }
      
      await client.sendMessage(from, content, { quoted: message });
    } catch (e) {
      console.error(`Emoji command ${emoji} error:`, e.message);
    }
  });
});

// Quick Access Shortcuts
const quickCommands = [
  { pattern: "v", alias: ["📸", "🖼️"], desc: "Quick image retrieval" },
  { pattern: "vvv", alias: ["🎥", "🎬"], desc: "Quick video retrieval" },
  { pattern: "a", alias: ["🎵", "🔊"], desc: "Quick audio retrieval" }
];

quickCommands.forEach(({ pattern, alias }) => {
  cmd({
    pattern: pattern,
    alias: alias,
    desc: "Quick View-Once Access",
    category: "owner",
    filename: __filename
  }, async (client, message, match, { from, isCreator }) => {
    // Quick access - minimal responses
    if (!isCreator) return;
    
    const quoted = match.quoted;
    if (!quoted) return;
    
    try {
      const buffer = await quoted.download();
      const mtype = quoted.mtype;
      
      let content = {};
      if (mtype === "imageMessage") {
        content = { image: buffer };
      } else if (mtype === "videoMessage") {
        content = { video: buffer };
      } else if (mtype === "audioMessage") {
        content = { audio: buffer };
      }
      
      if (Object.keys(content).length > 0) {
        await client.sendMessage(from, content, { quoted: message });
      }
    } catch (e) {
      console.error(`Quick command ${pattern} error:`, e.message);
    }
  });
});