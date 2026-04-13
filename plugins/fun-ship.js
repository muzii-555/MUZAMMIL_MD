const axios = require("axios");
const fetch = require("node-fetch");
const { sleep } = require('../lib/functions');
const { cmd, commands } = require("../command");
const config = require("../config");

// Love percentage calculator
function calculateLovePercentage(name1, name2) {
  const combined = (name1 + name2).toLowerCase();
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    hash = ((hash << 5) - hash) + combined.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash % 51) + 50; // 50-100%
}

// Random love messages
const loveMessages = [
  "💘 *Match Found!* 💘\n\n❤️ @user1 + @user2\n\n💖 *Congratulations!* 🎉\nYour love percentage is *{percent}%*!",
  
  "💕 *Love is in the air!* 💕\n\n💝 @user1 💝 @user2\n\n🌟 *Perfect Match!*\nLove Percentage: *{percent}%*",
  
  "💑 *Jodi No. 1!* 💑\n\n💞 @user1 + @user2\n\n✨ *Rab ne bana di jodi!*\nCompatibility: *{percent}%*",
  
  "💓 *Dil se Dil tak!* 💓\n\n💗 @user1 💗 @user2\n\n🎯 *Match Score:* *{percent}%*\nMade for each other!",
  
  "💘 *Ship Sailed!* 🚢\n\n👩‍❤️‍👨 @user1 + @user2\n\n💫 *Love Percentage:* *{percent}%*\nHappily ever after!",
  
  "❤️‍🔥 *Soulmates Found!* ❤️‍🔥\n\n💋 @user1 💋 @user2\n\n🔥 *Passion Level:* *{percent}%*\nTrue love exists!"
];

// Random reactions
const reactions = ["❤️", "💘", "💕", "💝", "💖", "💗", "💓", "💞", "💑", "😍"];

// Helper function to get user display name
function getUserName(participants, userId) {
  const user = participants?.find(p => p.id === userId);
  return user?.notify || userId.split('@')[0];
}

cmd({
  pattern: "ship",
  alias: ["match", "love", "jodi", "couple", "pair"],
  desc: "💘 Randomly pairs you with another group member with love percentage",
  react: "❤️",
  category: "fun",
  use: ".ship (in group)",
  filename: __filename
}, async (conn, m, store, { from, isGroup, groupMetadata, reply, sender }) => {
  try {
    if (!isGroup) {
      return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 💘 *SHIP COMMAND*
*│*
*│* ❌ This command only works in groups!
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }

    const participants = groupMetadata.participants;
    const botNumber = conn.user.id;
    
    // Get sender info
    const senderInfo = participants.find(p => p.id === sender);
    const senderName = senderInfo?.notify || sender.split('@')[0];
    
    // Filter eligible participants (not sender, not bot)
    const eligible = participants.filter(p => 
      p.id !== sender && 
      p.id !== botNumber &&
      !p.id.includes(botNumber.split('@')[0])
    );
    
    if (eligible.length < 1) {
      return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 💘 *SHIP COMMAND*
*│*
*│* ❌ Not enough participants to ship!
*│* Add more members to the group.
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }

    // Add random reaction
    const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
    await conn.sendMessage(from, { react: { text: randomReaction, key: m.key } });

    // Check for special number (DEV) in config
    const specialNumber = config.DEV ? `${config.DEV}@s.whatsapp.net` : null;
    let randomPair;

    if (specialNumber && eligible.some(p => p.id === specialNumber)) {
      // If DEV is in group, sometimes pair with them (30% chance)
      if (Math.random() < 0.3) {
        randomPair = specialNumber;
      } else {
        randomPair = eligible[Math.floor(Math.random() * eligible.length)].id;
      }
    } else {
      randomPair = eligible[Math.floor(Math.random() * eligible.length)].id;
    }

    // Get paired user name
    const pairName = getUserName(participants, randomPair);

    // Calculate love percentage
    const lovePercent = calculateLovePercentage(senderName, pairName);

    // Select random message
    const randomMsg = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    let message = randomMsg
      .replace('@user1', `@${sender.split('@')[0]}`)
      .replace('@user2', `@${randomPair.split('@')[0]}`)
      .replace('{percent}', lovePercent);

    // Add extra flair based on percentage
    if (lovePercent >= 90) {
      message += `\n\n🌟 *PERFECT MATCH!* 🌟\nSoulmates alert! 🚨`;
    } else if (lovePercent >= 80) {
      message += `\n\n💫 *Excellent Compatibility!* 💫\nMade for each other!`;
    } else if (lovePercent >= 70) {
      message += `\n\n✨ *Great Match!* ✨\nGive it a chance! 💕`;
    } else if (lovePercent >= 60) {
      message += `\n\n🌸 *Good Potential!* 🌸\nWork on it! 💪`;
    } else {
      message += `\n\n🌱 *Friendship First!* 🌱\nLove takes time! ⏳`;
    }

    message += `\n\n*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* 📌 *Powered by MUZAMMIL-MD*\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

    // Send message with mentions
    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [sender, randomPair],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363424043617436@newsletter",
          newsletterName: "MUZAMMIL-MD",
          serverMessageId: 143
        }
      }
    }, { quoted: m });

    // Send follow-up button if supported
    try {
      const buttonMessage = {
        text: `💘 *Want to try again?*\n\n.type .ship`,
        footer: "MUZAMMIL-MD",
        buttons: [
          { buttonId: 'ship_again', buttonText: { displayText: '💘 Ship Again' }, type: 1 },
          { buttonId: 'ship_percent', buttonText: { displayText: '📊 Check Another' }, type: 1 }
        ],
        headerType: 1,
        viewOnce: true
      };
      await conn.sendMessage(from, buttonMessage);
    } catch (buttonError) {
      // Buttons not supported, skip
    }

  } catch (error) {
    console.error("❌ Error in ship command:", error);
    reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 💘 *SHIP COMMAND*
*│*
*│* ❌ Error: ${error.message}
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
    );
  }
});

// Button handler for "Ship Again"
cmd({
  pattern: "ship_again",
  react: "💘",
  desc: "Ship again with someone else",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, isGroup, groupMetadata, sender }) => {
  if (!isGroup) return;
  
  const participants = groupMetadata.participants;
  const botNumber = conn.user.id;
  const senderInfo = participants.find(p => p.id === sender);
  const senderName = senderInfo?.notify || sender.split('@')[0];
  
  const eligible = participants.filter(p => 
    p.id !== sender && 
    p.id !== botNumber &&
    !p.id.includes(botNumber.split('@')[0])
  );
  
  if (eligible.length < 1) return;
  
  const randomPair = eligible[Math.floor(Math.random() * eligible.length)].id;
  const pairName = randomPair.notify || randomPair.split('@')[0];
  
  const lovePercent = calculateLovePercentage(senderName, pairName);
  
  const randomMsg = loveMessages[Math.floor(Math.random() * loveMessages.length)];
  let message = randomMsg
    .replace('@user1', `@${sender.split('@')[0]}`)
    .replace('@user2', `@${randomPair.split('@')[0]}`)
    .replace('{percent}', lovePercent);
  
  message += `\n\n*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* 📌 *Powered by MUZAMMIL-MD*\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;
  
  await conn.sendMessage(from, {
    text: message,
    contextInfo: {
      mentionedJid: [sender, randomPair],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363424043617436@newsletter",
        newsletterName: "MUZAMMIL-MD",
        serverMessageId: 143
      }
    }
  }, { quoted: mek });
});

// Button handler for "Check Another"
cmd({
  pattern: "ship_percent",
  react: "📊",
  desc: "Check compatibility with another person",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, isGroup, groupMetadata, sender }) => {
  if (!isGroup) return;
  
  const participants = groupMetadata.participants;
  const botNumber = conn.user.id;
  const senderInfo = participants.find(p => p.id === sender);
  const senderName = senderInfo?.notify || sender.split('@')[0];
  
  const eligible = participants.filter(p => 
    p.id !== sender && 
    p.id !== botNumber &&
    !p.id.includes(botNumber.split('@')[0])
  );
  
  if (eligible.length < 1) return;
  
  const randomPair = eligible[Math.floor(Math.random() * eligible.length)].id;
  const pairName = randomPair.notify || randomPair.split('@')[0];
  
  const lovePercent = calculateLovePercentage(senderName, pairName);
  
  const randomMsg = loveMessages[Math.floor(Math.random() * loveMessages.length)];
  let message = randomMsg
    .replace('@user1', `@${sender.split('@')[0]}`)
    .replace('@user2', `@${randomPair.split('@')[0]}`)
    .replace('{percent}', lovePercent);
  
  message += `\n\n*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* 📌 *Powered by MUZAMMIL-MD*\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;
  
  await conn.sendMessage(from, {
    text: message,
    contextInfo: {
      mentionedJid: [sender, randomPair],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363424043617436@newsletter",
        newsletterName: "MUZAMMIL-MD",
        serverMessageId: 143
      }
    }
  }, { quoted: mek });
});