const { cmd } = require("../command");

// Enhanced View-Once Retriever with Stealth Commands
cmd({
  pattern: "vv2",
  alias: ["wah", "💋", "❤️", "🙂", "nice", "ok", "seen", "view", "👀", "📸", "🎥", "🎵", "save", "get", "fetch", "retrieve", "stealth", "hidden", "secret"],
  desc: "Owner Only - Stealth retrieve quoted view-once messages",
  category: "owner",
  filename: __filename
}, async (client, message, match, { from, isCreator }) => {
  try {
    // Stealth mode - absolutely no response if not owner
    if (!isCreator) {
      // Silent return - acts like command doesn't exist
      return;
    }

    // Check if replying to a message
    if (!match.quoted) {
      // Silent fail for non-quoted messages
      return;
    }

    const quotedMsg = match.quoted;
    const msgType = quotedMsg.mtype;
    
    // Check if it's a view-once message
    const isViewOnce = quotedMsg.viewOnce || 
                      (quotedMsg.message?.imageMessage?.viewOnce) ||
                      (quotedMsg.message?.videoMessage?.viewOnce) ||
                      (quotedMsg.message?.audioMessage?.viewOnce);

    if (!isViewOnce) {
      // Silent fail for non-view-once messages
      return;
    }

    // Download the media
    const buffer = await quotedMsg.download();
    
    // Prepare stealth options
    const options = { 
      quoted: null, // Don't quote the original command
      ephemeralExpiration: message.expiration // Maintain if any
    };

    let messageContent = {};
    let caption = quotedMsg.text || quotedMsg.caption || '';
    
    // Add stealth prefix to caption
    const stealthCaption = `*🔒 RETRIEVED CONTENT*\n${caption}`;

    switch (msgType) {
      case "imageMessage":
        messageContent = {
          image: buffer,
          caption: stealthCaption,
          mimetype: quotedMsg.mimetype || "image/jpeg"
        };
        break;
        
      case "videoMessage":
        messageContent = {
          video: buffer,
          caption: stealthCaption,
          mimetype: quotedMsg.mimetype || "video/mp4",
          gifPlayback: quotedMsg.gifPlayback || false
        };
        break;
        
      case "audioMessage":
        messageContent = {
          audio: buffer,
          mimetype: quotedMsg.mimetype || "audio/mp4",
          ptt: quotedMsg.ptt || false
        };
        break;
        
      default:
        // Silent fail for unsupported types
        return;
    }

    // Send to user's DM silently
    await client.sendMessage(message.sender, messageContent, options);
    
    // Optional: Send a stealth confirmation in the group (can be disabled)
    // Uncomment below if you want a subtle confirmation
    /*
    await client.sendMessage(from, {
      text: "✅",
      ephemeralExpiration: 5 // Auto-delete after 5 seconds
    });
    */
    
  } catch (error) {
    // Silent error handling - only logs to console
    console.error("Stealth VV Error:", error.message);
    
    // Optional: Silent error notification to owner only
    // Uncomment if you want error notifications
    /*
    if (isCreator) {
      await client.sendMessage(message.sender, {
        text: `⚠️ VV Error: ${error.message}`
      });
    }
    */
  }
});

// Additional Stealth Commands - These work as hidden aliases
const stealthCommands = [
  {
    pattern: "s1",
    alias: ["👻", "🕵️", "🤫"],
    desc: "Hidden View-Once Retriever",
    handler: async (client, message) => {
      // This is a duplicate handler that points to the same functionality
      // but with different pattern matching
      const { from, isCreator } = message;
      
      if (!isCreator) return;
      
      const quoted = message.quoted;
      if (!quoted) return;
      
      try {
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
        
        await client.sendMessage(message.sender, content);
      } catch (e) {
        console.error("S1 Error:", e.message);
      }
    }
  }
];

// Register stealth commands
stealthCommands.forEach(cmd => {
  // These commands won't appear in normal help menus
  // and are only known to the owner
  const command = require("../command");
  command({
    pattern: cmd.pattern,
    alias: cmd.alias,
    desc: cmd.desc,
    category: "hidden",
    filename: __filename
  }, cmd.handler);
});

// Advanced Stealth Mode - Response to specific keywords in DM
cmd({
  on: "text",
  fromMe: true
}, async (client, message) => {
  const text = message.body?.toLowerCase();
  
  // Hidden trigger words that activate view-once retrieval
  const stealthTriggers = [
    "sendme", "bringit", "fetchit", "getit", 
    "showme", "reveal", "unveil", "expose"
  ];
  
  if (stealthTriggers.some(trigger => text?.includes(trigger))) {
    const quoted = message.quoted;
    if (!quoted) return;
    
    const isViewOnce = quoted.viewOnce || 
                      quoted.message?.imageMessage?.viewOnce ||
                      quoted.message?.videoMessage?.viewOnce;
    
    if (!isViewOnce) return;
    
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
      
      await client.sendMessage(message.from, content);
      
      // Delete the trigger message for stealth
      await client.sendMessage(message.from, {
        delete: message.key
      });
    } catch (e) {
      console.error("Stealth trigger error:", e.message);
    }
  }
});

// Emergency Recovery Command - Hidden from normal help
cmd({
  pattern: "recover",
  alias: ["restore", "salvage", "rescue"],
  desc: "Emergency View-Once Recovery",
  category: "hidden",
  filename: __filename
}, async (client, message, match, { from, isCreator }) => {
  if (!isCreator) return;
  
  const quoted = match.quoted;
  if (!quoted) {
    return await client.sendMessage(message.sender, {
      text: "*🔐 Emergency Recovery Mode*\nReply to a view-once message to recover it."
    });
  }
  
  try {
    const buffer = await quoted.download();
    const mtype = quoted.mtype;
    
    let content = {};
    let fileType = '';
    
    switch (mtype) {
      case "imageMessage":
        content = { 
          image: buffer,
          caption: `*📸 RECOVERED IMAGE*\n${quoted.caption || ''}`
        };
        fileType = 'Image';
        break;
      case "videoMessage":
        content = { 
          video: buffer,
          caption: `*🎥 RECOVERED VIDEO*\n${quoted.caption || ''}`
        };
        fileType = 'Video';
        break;
      case "audioMessage":
        content = { 
          audio: buffer,
          mimetype: "audio/mp4",
          ptt: quoted.ptt || false
        };
        fileType = 'Audio';
        break;
    }
    
    if (Object.keys(content).length > 0) {
      await client.sendMessage(message.sender, content);
      
      // Send confirmation that auto-deletes
      await client.sendMessage(from, {
        text: `✅ ${fileType} Recovered`,
        ephemeralExpiration: 3 // Deletes after 3 seconds
      });
    }
  } catch (error) {
    await client.sendMessage(message.sender, {
      text: `❌ Recovery Failed: ${error.message}`,
      ephemeralExpiration: 5
    });
  }
});