const { cmd } = require('../command');
const axios = require('axios');

cmd({
  pattern: "xstalk",
  alias: ["twitterstalk", "twtstalk", "xinfo", "twitterinfo"],
  desc: "Get details about a Twitter/X user",
  react: "🔍",
  category: "search",
  filename: __filename
}, async (conn, m, store, { from, q, reply, sender }) => {
  try {
    if (!q) {
      return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🔍 *X/TWITTER STALK*
*│*
*│* ❌ Please provide a valid X/Twitter username!
*│*
*│* 📝 *Example:* .xstalk elonmusk
*│* 📝 *Example:* .xstalk MrBeast
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }

    // Add reaction
    await conn.sendMessage(from, { react: { text: "🔍", key: m.key } });

    // Processing message
    await conn.sendMessage(from, {
      text: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* 🔍 *Fetching X/Twitter profile...*\n*│* 👤 @${q}\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
    }, { quoted: m });

    const apiUrl = `https://delirius-apiofc.vercel.app/tools/xstalk?username=${encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl);

    if (!data || !data.status || !data.data) {
      return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🔍 *X/TWITTER STALK*
*│*
*│* ❌ User *"@${q}"* not found!
*│* Please check the username and try again.
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }

    const user = data.data;
    const verified = user.verified ? "✅ Yes" : "❌ No";
    
    // Format numbers
    const followers = parseInt(user.followers_count || 0).toLocaleString();
    const following = parseInt(user.following_count || 0).toLocaleString();
    const tweets = parseInt(user.tweets_count || 0).toLocaleString();
    
    // Calculate follower/following ratio
    const ratio = user.following_count > 0 
      ? (user.followers_count / user.following_count).toFixed(2) 
      : '∞';
    
    // Format joined date
    const joinedDate = user.created || 'Unknown';

    const caption = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🐦 *X/TWITTER PROFILE*
*│*
*│* 👤 *Name:* ${user.name}
*│* 🆔 *Username:* @${user.username}
*│* ✅ *Verified:* ${verified}
*│*
*│* ─── *📊 STATISTICS* ───
*│*
*│* 👥 *Followers:* ${followers}
*│* 👤 *Following:* ${following}
*│* 📝 *Tweets:* ${tweets}
*│* 📈 *F/F Ratio:* ${ratio}
*│*
*│* ─── *📅 INFO* ───
*│*
*│* 📅 *Joined:* ${joinedDate}
*│* 🔗 *Profile:* ${user.url || `https://x.com/${user.username}`}
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

    await conn.sendMessage(from, {
      image: { url: user.avatar || 'https://files.catbox.moe/s3cve5.jpg' },
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
    console.error("XSTALK ERROR:", error);
    reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🔍 *X/TWITTER STALK*
*│*
*│* ❌ Failed to fetch X/Twitter profile!
*│* Please try again later.
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
    );
  }
});