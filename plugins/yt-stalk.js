const { cmd } = require('../command');
const axios = require('axios');

cmd({
  pattern: "ytstalk",
  alias: ["ytinfo", "youtubestalk", "channelinfo", "ytchannel"],
  desc: "Get details about a YouTube channel.",
  react: "🔍",
  category: "search",
  filename: __filename
}, async (conn, m, store, { from, quoted, q, reply, sender }) => {
  try {
    if (!q) {
      return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🔍 *YOUTUBE STALK*
*│*
*│* ❌ Please provide a YouTube channel username or ID!
*│*
*│* 📝 *Example:* .ytstalk MrBeast
*│* 📝 *Example:* .ytstalk @PewDiePie
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }

    // Add reaction
    await conn.sendMessage(from, { react: { text: "🔍", key: m.key } });

    // Processing message
    await conn.sendMessage(from, {
      text: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* 🔍 *Fetching YouTube channel...*\n*│* 📺 ${q}\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
    }, { quoted: m });

    const apiUrl = `https://delirius-apiofc.vercel.app/tools/ytstalk?channel=${encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl);

    if (!data || !data.status || !data.data) {
      return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🔍 *YOUTUBE STALK*
*│*
*│* ❌ Channel *"${q}"* not found!
*│* Please check the username/ID and try again.
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }

    const yt = data.data;
    
    // Format subscriber count
    const subscribers = formatNumber(yt.subscriber_count);
    const videos = formatNumber(yt.video_count);
    const views = yt.view_count ? formatNumber(yt.view_count) : 'N/A';
    
    // Get channel creation date if available
    const createdDate = yt.created_date || 'N/A';

    const caption = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📺 *YOUTUBE CHANNEL*
*│*
*│* 👤 *Username:* ${yt.username || q}
*│* 🏷️ *Display Name:* ${yt.name || yt.username || q}
*│*
*│* ─── *📊 STATISTICS* ───
*│*
*│* 👥 *Subscribers:* ${subscribers}
*│* 🎥 *Total Videos:* ${videos}
*│* 👁️ *Total Views:* ${views}
*│*
*│* ─── *ℹ️ INFO* ───
*│*
*│* 📅 *Created:* ${createdDate}
*│* 🌍 *Country:* ${yt.country || 'N/A'}
*│* 🔗 *Channel URL:* ${yt.channel || `https://youtube.com/@${q}`}
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

    await conn.sendMessage(from, {
      image: { url: yt.avatar || 'https://files.catbox.moe/s3cve5.jpg' },
      caption,
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
    }, { quoted: m });

    // Success reaction
    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

  } catch (error) {
    console.error("YTSTALK ERROR:", error);
    reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🔍 *YOUTUBE STALK*
*│*
*│* ❌ Failed to fetch channel details!
*│* Please try again later.
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
    );
  }
});

// Helper function to format numbers (e.g., 1.2M, 500K)
function formatNumber(num) {
  if (!num) return '0';
  const n = parseInt(num);
  if (n >= 1000000) {
    return (n / 1000000).toFixed(1) + 'M';
  } else if (n >= 1000) {
    return (n / 1000).toFixed(1) + 'K';
  }
  return n.toLocaleString();
}