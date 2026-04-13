const axios = require("axios");
const { cmd } = require("../command");
const { fetchGif, gifToVideo } = require("../lib/fetchGif");

// Wedding/Marriage GIF APIs
const weddingGifApis = [
  "https://api.waifu.pics/sfw/kiss",
  "https://api.waifu.pics/sfw/hug",
  "https://api.waifu.pics/sfw/cuddle",
  "https://api.waifu.pics/sfw/happy"
];

// Random marriage messages
const marriageMessages = [
  "💍 *Shadi Mubarak!* 💒\n\n👰 @user1 + 🤵 @user2\n\n✨ *Rab ne bana di jodi!* ✨\nMay your love story be forever! 💖",
  
  "💒 *Wedding Bells!* 💒\n\n💍 @user1 💕 @user2\n\n🌟 *Congratulations to the lovely couple!*\nWishing you a lifetime of happiness together! 💑",
  
  "🎊 *Baraat aa gayi!* 🎊\n\n👰 @user1 🤵 @user2\n\n💝 *Dulha Dulhan Mubarak!*\nAllah aapko sada khush rakhe! 🤲",
  
  "💐 *Newly Wed!* 💐\n\n💞 @user1 💞 @user2\n\n🌹 *Just Married!*\nMay your love grow stronger each day! 💪💕",
  
  "🏰 *Royal Wedding!* 🏰\n\n👑 @user1 👑 @user2\n\n✨ *You are now pronounced partners for life!*\nHappily ever after begins now! 💖",
  
  "🎵 *Dhol Baje!* 🎵\n\n💃 @user1 🕺 @user2\n\n💍 *Congratulations on your wedding!*\nMubarak ho! Mubarak ho! 🎉"
];

// Random wedding blessings
const blessings = [
  "\n\n🤲 *Dua:* Allah aapko hamesha khush rakhe!",
  "\n\n🌸 *Blessing:* May your love bloom forever!",
  "\n\n⭐ *Wish:* Stay together through thick and thin!",
  "\n\n💫 *Prayer:* Rab rakha!",
  "\n\n🕊️ *Blessing:* Peace and love always!"
];

// Random wedding songs/sher
const weddingSher = [
  "\n\n📜 *Sher:*\n_Tumhe dekha to yeh khayal aaya,_\n_Zindagi dhoop, tum ghana saaya!_ 💕",
  
  "\n\n📜 *Sher:*\n_Aap ki shadi ki khushi mein hum bhi khush hain,_\n_Dua hai Khuda se, sada aabaad raho!_ 🤲",
  
  "\n\n📜 *Sher:*\n_Tere dil mein rehne ki jagah maang li,_n_Jaan se bhi pyara tujhe maan liya!_ 💖"
];

// Reaction emojis
const reactions = ["💍", "💒", "💝", "🎊", "💐", "💑", "💕", "🌸"];

cmd({
  pattern: "marige",
  alias: ["shadi", "marriage", "wedding", "nikaah", "byah"],
  desc: "💍 Randomly pairs two users for marriage with wedding GIF",
  react: "💍",
  category: "fun",
  use: ".marige (in group)",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  try {
    if (!isGroup) {
      return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 💍 *MARRIAGE COMMAND*
*│*
*│* ❌ This command only works in groups!
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }

    const participants = groupMetadata.participants.map(user => user.id);
    const botNumber = conn.user.id;
    
    // Filter eligible participants (not sender, not bot)
    const eligibleParticipants = participants.filter(id => 
      id !== sender && 
      id !== botNumber &&
      !id.includes(botNumber.split('@')[0])
    );
    
    if (eligibleParticipants.length < 1) {
      return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 💍 *MARRIAGE COMMAND*
*│*
*│* ❌ Not enough participants for marriage!
*│* Add more members to the group.
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }

    // Add reaction
    const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
    await conn.sendMessage(mek.chat, { react: { text: randomReaction, key: mek.key } });

    // Select random partner
    const randomIndex = Math.floor(Math.random() * eligibleParticipants.length);
    const partner = eligibleParticipants[randomIndex];

    // Try to get partner's name from group metadata
    const partnerInfo = groupMetadata.participants.find(p => p.id === partner);
    const senderInfo = groupMetadata.participants.find(p => p.id === sender);
    
    const partnerName = partnerInfo?.notify || partner.split("@")[0];
    const senderName = senderInfo?.notify || sender.split("@")[0];

    // Fetch wedding GIF from multiple APIs with fallback
    let gifUrl = null;
    for (const api of weddingGifApis) {
      try {
        const res = await axios.get(api);
        if (res.data && res.data.url) {
          gifUrl = res.data.url;
          break;
        }
      } catch (e) {
        continue;
      }
    }

    // Fallback GIF if all APIs fail
    if (!gifUrl) {
      gifUrl = "https://media.tenor.com/6eKdLcXZqXEAAAAC/love-couple.gif";
    }

    // Fetch and convert GIF to video
    let videoBuffer;
    try {
      const gifBuffer = await fetchGif(gifUrl);
      videoBuffer = await gifToVideo(gifBuffer);
    } catch (gifError) {
      console.error("GIF conversion failed:", gifError);
      // Send as image fallback
      return await conn.sendMessage(
        mek.chat,
        { 
          image: { url: gifUrl },
          caption: generateMessage(senderName, partnerName, sender, partner)
        },
        { quoted: mek }
      );
    }

    // Generate marriage message
    const message = generateMessage(senderName, partnerName, sender, partner);

    // Send wedding video
    await conn.sendMessage(
      mek.chat,
      { 
        video: videoBuffer, 
        caption: message, 
        gifPlayback: true, 
        mentions: [sender, partner] 
      },
      { quoted: mek }
    );

    // Send follow-up message with buttons (if supported)
    try {
      const buttonMessage = {
        text: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* 💝 *Shaadi ki daawat!*\n*│* 🎉 Sab ko mubarak ho!\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`,
        footer: "MUZAMMIL-MD",
        buttons: [
          { buttonId: 'marriage_accept', buttonText: { displayText: '💝 Mubarak Ho' }, type: 1 },
          { buttonId: 'marriage_gift', buttonText: { displayText: '🎁 Gift Dedo' }, type: 1 }
        ],
        headerType: 1,
        viewOnce: true
      };
      await conn.sendMessage(mek.chat, buttonMessage);
    } catch (buttonError) {
      // Buttons not supported, skip
    }

    // Success reaction
    await conn.sendMessage(mek.chat, { react: { text: "✅", key: mek.key } });

  } catch (error) {
    console.error("❌ Error in .marige command:", error);
    reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 💍 *MARRIAGE COMMAND*
*│*
*│* ❌ Error: ${error.message}
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
    );
  }
});

// Helper function to generate marriage message
function generateMessage(senderName, partnerName, sender, partner) {
  const randomMsg = marriageMessages[Math.floor(Math.random() * marriageMessages.length)];
  const randomBlessing = blessings[Math.floor(Math.random() * blessings.length)];
  const randomSher = Math.random() > 0.5 ? weddingSher[Math.floor(Math.random() * weddingSher.length)] : "";
  
  let message = randomMsg
    .replace('@user1', `@${sender.split("@")[0]}`)
    .replace('@user2', `@${partner.split("@")[0]}`);
  
  message += randomBlessing;
  
  if (randomSher) {
    message += randomSher;
  }
  
  message += `\n\n*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;
  
  return message;
}

// Button handlers for marriage interactions
cmd({
  pattern: "marriage_accept",
  react: "💝",
  desc: "Accept marriage blessings",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, reply, sender }) => {
  const messages = [
    "💝 *Mubarak ho!* Allah aapko hamesha khush rakhe! 🤲",
    "🌸 *Shukriya!* Aap bhi khush raho! 💕",
    "🎉 *Thank you!* Duaon mein yaad rakhiyega! 💫",
    "💐 *JazakAllah!* Aapki mohabbat ka shukriya! ✨"
  ];
  const randomMsg = messages[Math.floor(Math.random() * messages.length)];
  await conn.sendMessage(from, { text: randomMsg }, { quoted: mek });
});

cmd({
  pattern: "marriage_gift",
  react: "🎁",
  desc: "Send wedding gift",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  const gifts = ["💍", "💰", "💎", "👑", "🏠", "🚗", "💒", "🎁"];
  const randomGift = gifts[Math.floor(Math.random() * gifts.length)];
  
  const messages = [
    `🎁 *Gift:* ${randomGift} ${randomGift} ${randomGift}\n\nSalami pesh hai! 💝`,
    `🎁 *Shaadi ka gift:* ${randomGift}\n\nAllah aapko aur taraqqi de! 🤲`,
    `🎁 *Mubarakbaad ka gift:* ${randomGift} ${randomGift}\n\nKhush raho! 💕`
  ];
  const randomMsg = messages[Math.floor(Math.random() * messages.length)];
  await conn.sendMessage(from, { text: randomMsg }, { quoted: mek });
});