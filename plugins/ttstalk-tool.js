const axios = require("axios");
const { cmd } = require("../command");

cmd({
    pattern: "tiktokstalk",
    alias: ["tstalk", "ttstalk", "tiktokinfo", "ttinfo"],
    react: "❤️‍🔥",
    desc: "Get TikTok user profile details",
    category: "search",
    filename: __filename
}, async (conn, mek, m, { from, q, reply, sender }) => {
    try {
        if (!q) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎵 *TIKTOK STALK*
*│*
*│* ❌ Please provide a TikTok username!
*│*
*│* 📝 *Example:* .tiktokstalk khaby.lame
*│* 📝 *Example:* .tstalk mrbeast
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        // Add reaction
        await conn.sendMessage(from, { react: { text: '❤️‍🔥', key: m.key } });

        // Processing message
        await conn.sendMessage(from, {
            text: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* 🔍 *Fetching TikTok profile...*\n*│* 👤 @${q}\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        }, { quoted: mek });

        const apiUrl = `https://api.siputzx.my.id/api/stalk/tiktok?username=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl, { timeout: 60000 });

        if (!data.status) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎵 *TIKTOK STALK*
*│*
*│* ❌ User *"@${q}"* not found!
*│* Please check the username and try again.
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        const user = data.data.user;
        const stats = data.data.stats;

        // Calculate engagement rate
        const engagementRate = stats.followerCount > 0 
            ? ((stats.heartCount / stats.followerCount) * 100).toFixed(2) 
            : '0.00';

        // Format numbers
        const followers = stats.followerCount.toLocaleString();
        const following = stats.followingCount.toLocaleString();
        const likes = stats.heartCount.toLocaleString();
        const videos = stats.videoCount.toLocaleString();

        const caption = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎵 *TIKTOK PROFILE*
*│*
*│* 👤 *Username:* @${user.uniqueId}
*│* 📛 *Nickname:* ${user.nickname}
*│* ✅ *Verified:* ${user.verified ? "✅ Yes" : "❌ No"}
*│* 🔒 *Private:* ${user.privateAccount ? "🔒 Yes" : "🌐 No"}
*│*
*│* ─── *📍 LOCATION* ───
*│*
*│* 🌍 *Region:* ${user.region || "Unknown"}
*│*
*│* ─── *📝 BIO* ───
*│*
*│* ${user.signature || "No bio available"}
*│*
*│* 🔗 *Bio Link:* ${user.bioLink?.link || "No link"}
*│*
*│* ─── *📊 STATISTICS* ───
*│*
*│* 👥 *Followers:* ${followers}
*│* 👤 *Following:* ${following}
*│* ❤️ *Total Likes:* ${likes}
*│* 🎥 *Videos:* ${videos}
*│* 📈 *Engagement:* ${engagementRate}%
*│*
*│* ─── *📅 DATES* ───
*│*
*│* 📅 *Account Created:* ${new Date(user.createTime * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
*│*
*│* 🔗 *Profile URL:* https://www.tiktok.com/@${user.uniqueId}
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

        await conn.sendMessage(
            from,
            {
                image: { url: user.avatarLarger },
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
            },
            { quoted: mek }
        );

        // Success reaction
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (err) {
        console.error("TIKTOK STALK ERROR:", err);
        
        if (err.code === 'ECONNABORTED') {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎵 *TIKTOK STALK*
*│*
*│* ❌ Request timeout! Please try again.
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }
        
        reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎵 *TIKTOK STALK*
*│*
*│* ❌ Failed to fetch TikTok profile!
*│* Please try again later.
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }
});