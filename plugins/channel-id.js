const { cmd } = require("../command");

cmd({
  pattern: "cid",
  alias: ["newsletter", "id", "channelinfo", "chinfo", "cinfo"],
  react: "📡",
  desc: "Get WhatsApp Channel info from link",
  category: "whatsapp",
  filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) {
      return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ ❌ CHANNEL LINK MISSING*
*┇▸ 📝 PLEASE PROVIDE A LINK*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ 💡 EXAMPLE:*
*┇▸ .cid https://whatsapp.com/channel/xxxx*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }

    const match = q.match(/whatsapp\.com\/channel\/([\w-]+)/);
    if (!match) {
      return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ ⚠️ INVALID CHANNEL LINK*
*┇▸ 🔗 USE PROPER WHATSAPP*
*┇▸ 📡 CHANNEL URL FORMAT*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }

    const inviteId = match[1];

    // Show processing reaction
    await conn.sendMessage(from, {
      react: { text: "⏳", key: m.key }
    });

    let metadata;
    try {
      metadata = await conn.newsletterMetadata("invite", inviteId);
    } catch (e) {
      await conn.sendMessage(from, {
        react: { text: "❌", key: m.key }
      });
      
      return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ ❌ FAILED TO FETCH CHANNEL*
*┇▸ 🔒 LINK MAY BE EXPIRED*
*┇▸ 🚫 OR CHANNEL IS PRIVATE*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }

    if (!metadata || !metadata.id) {
      await conn.sendMessage(from, {
        react: { text: "❌", key: m.key }
      });
      
      return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ ❌ CHANNEL NOT FOUND*
*┇▸ 🔍 VERIFY LINK & TRY AGAIN*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }

    // Format creation date
    const creationDate = metadata.creation_time 
      ? new Date(metadata.creation_time * 1000).toLocaleString('en-PK', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      : "Unknown";

    // Format subscribers with K/M/B suffixes
    const formatSubscribers = (count) => {
      if (!count) return "N/A";
      if (count >= 1000000) return (count / 1000000).toFixed(2) + 'M';
      if (count >= 1000) return (count / 1000).toFixed(2) + 'K';
      return count.toLocaleString();
    };

    // Check verification status
    const isVerified = metadata.verification === "VERIFIED" ? "✅ Yes" : "❌ No";

    const infoText =
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ 📡 CHANNEL INFORMATION*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ 🆔 CHANNEL ID:*
*┇▸ ${metadata.id}*
*┇▸*
*┇▸ 📌 CHANNEL NAME:*
*┇▸ ${metadata.name || "N/A"}*
*┇▸*
*┇▸ 📝 DESCRIPTION:*
*┇▸ ${metadata.description?.substring(0, 50) || "No description"}${metadata.description?.length > 50 ? '...' : ''}*
*┇▸*
*┇▸ 👥 SUBSCRIBERS:*
*┇▸ ${formatSubscribers(metadata.subscribers)}*
*┇▸*
*┇▸ ✅ VERIFIED:*
*┇▸ ${isVerified}*
*┇▸*
*┇▸ 📅 CREATED:*
*┇▸ ${creationDate}*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ 🤖 MUZAMMIL-MD*
*┇▸ 📡 CHANNEL INFO FETCHER*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

    // Send success reaction
    await conn.sendMessage(from, {
      react: { text: "✅", key: m.key }
    });

    // Send channel info with preview if available
    if (metadata.preview) {
      await conn.sendMessage(from, {
        image: { url: `https://pps.whatsapp.net${metadata.preview}` },
        caption: infoText
      }, { quoted: m });
    } else {
      await reply(infoText);
    }

  } catch (error) {
    console.error("CID ERROR:", error);
    
    await conn.sendMessage(from, {
      react: { text: "❌", key: m.key }
    });
    
    reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ ❌ UNEXPECTED ERROR*
*┇▸ 🔄 PLEASE TRY AGAIN LATER*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ 🤖 MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
    );
  }
});

// Additional Channel Commands for MUZAMMIL-MD

// Channel Subscribe Command
cmd({
  pattern: "chfollow",
  alias: ["subchannel", "joinchannel", "chadd"],
  react: "➕",
  desc: "Follow WhatsApp Channel by link",
  category: "whatsapp",
  filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) {
      return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ ❌ CHANNEL LINK MISSING*
*┇▸ 📝 PROVIDE CHANNEL LINK*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ 💡 EXAMPLE:*
*┇▸ .chfollow https://whatsapp.com/channel/xxxx*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }

    const match = q.match(/whatsapp\.com\/channel\/([\w-]+)/);
    if (!match) {
      return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ ⚠️ INVALID CHANNEL LINK*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }

    const inviteId = match[1];
    
    await conn.sendMessage(from, {
      react: { text: "⏳", key: m.key }
    });

    try {
      await conn.newsletterFollow(inviteId);
      
      await conn.sendMessage(from, {
        react: { text: "✅", key: m.key }
      });
      
      reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ ✅ SUCCESSFULLY FOLLOWED*
*┇▸ 📡 CHANNEL*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ 🤖 MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    } catch (e) {
      await conn.sendMessage(from, {
        react: { text: "❌", key: m.key }
      });
      
      reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ ❌ FAILED TO FOLLOW*
*┇▸ 🔒 CHANNEL MAY BE PRIVATE*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }
  } catch (error) {
    console.error("CHFOLLOW ERROR:", error);
    reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ ❌ UNEXPECTED ERROR*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
    );
  }
});

// Channel Unfollow Command
cmd({
  pattern: "chunfollow",
  alias: ["unsubchannel", "leavechannel", "chremove"],
  react: "➖",
  desc: "Unfollow WhatsApp Channel by link",
  category: "whatsapp",
  filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) {
      return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ ❌ CHANNEL LINK MISSING*
*┇▸ 📝 PROVIDE CHANNEL LINK*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }

    const match = q.match(/whatsapp\.com\/channel\/([\w-]+)/);
    if (!match) {
      return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ ⚠️ INVALID CHANNEL LINK*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }

    const inviteId = match[1];
    
    await conn.sendMessage(from, {
      react: { text: "⏳", key: m.key }
    });

    try {
      await conn.newsletterUnfollow(inviteId);
      
      await conn.sendMessage(from, {
        react: { text: "✅", key: m.key }
      });
      
      reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ ✅ SUCCESSFULLY UNFOLLOWED*
*┇▸ 📡 CHANNEL*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ 🤖 MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    } catch (e) {
      await conn.sendMessage(from, {
        react: { text: "❌", key: m.key }
      });
      
      reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ ❌ FAILED TO UNFOLLOW*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }
  } catch (error) {
    console.error("CHUNFOLLOW ERROR:", error);
    reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ ❌ UNEXPECTED ERROR*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
    );
  }
});