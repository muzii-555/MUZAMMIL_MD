const { cmd } = require("../command");

// Random compliment messages for boys
const boyCompliments = [
  "👦 *Yeh lo tumhara Bacha!* \n\n🌟 @user is your handsome prince! 👑",
  "👦 *Presenting your Boy!* \n\n💪 @user - The gentleman of the group! 😎",
  "👦 *Bacha mil gaya!* \n\n🔥 @user is your dashing dude! 💯",
  "👦 *Your chosen one!* \n\n✨ @user - The heartthrob! 💘",
  "👦 *Yeh raha aap ka Bacha!* \n\n🕶️ @user - Style aur swag dono! 💫",
  "👦 *Look who's here!* \n\n⭐ @user - The king of the group! 👑",
  "👦 *Mubarak ho!* \n\n🎯 @user is your perfect match! 💝",
  "👦 *Here's your Boy!* \n\n🚀 @user - Ready to steal hearts! 💖"
];

// Random compliment messages for girls
const girlCompliments = [
  "👧 *Yeh lo tumhari Bachi!* \n\n🌸 @user is your beautiful princess! 👸",
  "👧 *Presenting your Girl!* \n\n💕 @user - The queen of hearts! 💝",
  "👧 *Bachi mil gayi!* \n\n✨ @user is your gorgeous lady! 🌹",
  "👧 *Your chosen one!* \n\n💫 @user - Beauty with brains! 🎀",
  "👧 *Yeh rahi aap ki Bachi!* \n\n🦋 @user - Grace aur elegance! 💎",
  "👧 *Look who's here!* \n\n👑 @user - The diva of the group! 💖",
  "👧 *Mubarak ho!* \n\n🌟 @user is your perfect match! 💘",
  "👧 *Here's your Girl!* \n\n🌺 @user - Ready to rule hearts! 💗"
];

// Random reactions for both
const reactions = ["👦", "👧", "💕", "🌟", "✨", "💫", "🎉", "💝", "🎀", "👑"];

// Random fun facts/tags
const boyTags = ["😎", "💪", "🕶️", "🔥", "⭐", "🚀", "🎯", "💯"];
const girlTags = ["🌸", "💕", "🌹", "🦋", "💎", "👸", "🎀", "💖"];

// Helper function to generate message
function generateMessage(type, userName, userId) {
  const compliments = type === 'boy' ? boyCompliments : girlCompliments;
  const tags = type === 'boy' ? boyTags : girlTags;
  const randomTag1 = tags[Math.floor(Math.random() * tags.length)];
  const randomTag2 = tags[Math.floor(Math.random() * tags.length)];
  const randomTag3 = tags[Math.floor(Math.random() * tags.length)];
  
  const randomMsg = compliments[Math.floor(Math.random() * compliments.length)];
  let message = randomMsg.replace('@user', `@${userId.split('@')[0]}`);
  
  // Add extra flair
  message += `\n\n${randomTag1} *Specialty:* ${getRandomTrait(type)} ${randomTag2}\n`;
  message += `📊 *Rating:* ${Math.floor(Math.random() * 5 + 5)}/10 ${randomTag3}`;
  
  message += `\n\n*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* 📌 *Powered by MUZAMMIL-MD*\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;
  
  return message;
}

// Random traits generator
function getRandomTrait(type) {
  const boyTraits = ["Handsome", "Smart", "Funny", "Strong", "Charming", "Loyal", "Brave", "Cool"];
  const girlTraits = ["Beautiful", "Elegant", "Cute", "Graceful", "Lovely", "Charming", "Sweet", "Gorgeous"];
  
  const traits = type === 'boy' ? boyTraits : girlTraits;
  return traits[Math.floor(Math.random() * traits.length)];
}

// Helper function to get user display name
function getUserName(participants, userId) {
  const user = participants.find(p => p.id === userId);
  return user?.notify || userId.split('@')[0];
}

// Command for random boy selection
cmd({
  pattern: "bacha",
  alias: ["boy", "larka", "munda", "chokra", "boyfriend"],
  desc: "👦 Randomly selects a boy from the group with compliments",
  react: "👦",
  category: "fun",
  use: ".bacha (in group)",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  try {
    if (!isGroup) {
      return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 👦 *BACHA COMMAND*
*│*
*│* ❌ This command only works in groups!
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }

    const participants = groupMetadata.participants;
    const botNumber = conn.user.id;
    
    // Filter eligible participants (not bot)
    const eligible = participants.filter(p => 
      p.id !== botNumber && 
      !p.id.includes(botNumber.split('@')[0])
    );
    
    if (eligible.length < 1) {
      return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 👦 *BACHA COMMAND*
*│*
*│* ❌ No eligible participants found!
*│* Add more members to the group.
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }

    // Add random reaction
    const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
    await conn.sendMessage(mek.chat, { react: { text: randomReaction, key: mek.key } });

    // Select random boy
    const randomBoy = eligible[Math.floor(Math.random() * eligible.length)];
    const boyName = getUserName(participants, randomBoy.id);

    // Generate message
    const message = generateMessage('boy', boyName, randomBoy.id);

    // Send with mention
    await conn.sendMessage(
      mek.chat,
      { 
        text: message, 
        mentions: [randomBoy.id] 
      },
      { quoted: mek }
    );

    // Send follow-up button if supported
    try {
      const buttonMessage = {
        text: `👦 *Aur koi Bacha chahiye?*\n\n.type .bacha`,
        footer: "MUZAMMIL-MD",
        buttons: [
          { buttonId: 'bacha_again', buttonText: { displayText: '👦 Next Boy' }, type: 1 },
          { buttonId: 'bachi_now', buttonText: { displayText: '👧 Find Girl' }, type: 1 }
        ],
        headerType: 1,
        viewOnce: true
      };
      await conn.sendMessage(mek.chat, buttonMessage);
    } catch (buttonError) {
      // Buttons not supported, skip
    }

  } catch (error) {
    console.error("Error in .bacha command:", error);
    reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 👦 *BACHA COMMAND*
*│*
*│* ❌ Error: ${error.message}
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
    );
  }
});

// Command for random girl selection
cmd({
  pattern: "bachi",
  alias: ["girl", "kuri", "larki", "chori", "girlfriend", "gf"],
  desc: "👧 Randomly selects a girl from the group with compliments",
  react: "👧",
  category: "fun",
  use: ".bachi (in group)",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  try {
    if (!isGroup) {
      return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 👧 *BACHI COMMAND*
*│*
*│* ❌ This command only works in groups!
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }

    const participants = groupMetadata.participants;
    const botNumber = conn.user.id;
    
    // Filter eligible participants (not bot)
    const eligible = participants.filter(p => 
      p.id !== botNumber && 
      !p.id.includes(botNumber.split('@')[0])
    );
    
    if (eligible.length < 1) {
      return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 👧 *BACHI COMMAND*
*│*
*│* ❌ No eligible participants found!
*│* Add more members to the group.
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }

    // Add random reaction
    const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
    await conn.sendMessage(mek.chat, { react: { text: randomReaction, key: mek.key } });

    // Select random girl
    const randomGirl = eligible[Math.floor(Math.random() * eligible.length)];
    const girlName = getUserName(participants, randomGirl.id);

    // Generate message
    const message = generateMessage('girl', girlName, randomGirl.id);

    // Send with mention
    await conn.sendMessage(
      mek.chat,
      { 
        text: message, 
        mentions: [randomGirl.id] 
      },
      { quoted: mek }
    );

    // Send follow-up button if supported
    try {
      const buttonMessage = {
        text: `👧 *Aur koi Bachi chahiye?*\n\n.type .bachi`,
        footer: "MUZAMMIL-MD",
        buttons: [
          { buttonId: 'bachi_again', buttonText: { displayText: '👧 Next Girl' }, type: 1 },
          { buttonId: 'bacha_now', buttonText: { displayText: '👦 Find Boy' }, type: 1 }
        ],
        headerType: 1,
        viewOnce: true
      };
      await conn.sendMessage(mek.chat, buttonMessage);
    } catch (buttonError) {
      // Buttons not supported, skip
    }

  } catch (error) {
    console.error("Error in .bachi command:", error);
    reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 👧 *BACHI COMMAND*
*│*
*│* ❌ Error: ${error.message}
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
    );
  }
});

// Button handler for "Next Boy"
cmd({
  pattern: "bacha_again",
  react: "👦",
  desc: "Find another boy",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, isGroup, groupMetadata, reply }) => {
  if (!isGroup) return;
  
  const participants = groupMetadata.participants;
  const botNumber = conn.user.id;
  const eligible = participants.filter(p => 
    p.id !== botNumber && 
    !p.id.includes(botNumber.split('@')[0])
  );
  
  if (eligible.length < 1) return;
  
  const randomBoy = eligible[Math.floor(Math.random() * eligible.length)];
  const boyName = randomBoy.notify || randomBoy.id.split('@')[0];
  const message = generateMessage('boy', boyName, randomBoy.id);
  
  await conn.sendMessage(from, { text: message, mentions: [randomBoy.id] }, { quoted: mek });
});

// Button handler for "Next Girl"
cmd({
  pattern: "bachi_again",
  react: "👧",
  desc: "Find another girl",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, isGroup, groupMetadata, reply }) => {
  if (!isGroup) return;
  
  const participants = groupMetadata.participants;
  const botNumber = conn.user.id;
  const eligible = participants.filter(p => 
    p.id !== botNumber && 
    !p.id.includes(botNumber.split('@')[0])
  );
  
  if (eligible.length < 1) return;
  
  const randomGirl = eligible[Math.floor(Math.random() * eligible.length)];
  const girlName = randomGirl.notify || randomGirl.id.split('@')[0];
  const message = generateMessage('girl', girlName, randomGirl.id);
  
  await conn.sendMessage(from, { text: message, mentions: [randomGirl.id] }, { quoted: mek });
});

// Button handler for "Find Girl" from boy command
cmd({
  pattern: "bachi_now",
  react: "👧",
  desc: "Switch to find girl",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, isGroup, groupMetadata, reply }) => {
  if (!isGroup) return;
  
  const participants = groupMetadata.participants;
  const botNumber = conn.user.id;
  const eligible = participants.filter(p => 
    p.id !== botNumber && 
    !p.id.includes(botNumber.split('@')[0])
  );
  
  if (eligible.length < 1) return;
  
  const randomGirl = eligible[Math.floor(Math.random() * eligible.length)];
  const girlName = randomGirl.notify || randomGirl.id.split('@')[0];
  const message = generateMessage('girl', girlName, randomGirl.id);
  
  await conn.sendMessage(from, { text: message, mentions: [randomGirl.id] }, { quoted: mek });
});

// Button handler for "Find Boy" from girl command
cmd({
  pattern: "bacha_now",
  react: "👦",
  desc: "Switch to find boy",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, isGroup, groupMetadata, reply }) => {
  if (!isGroup) return;
  
  const participants = groupMetadata.participants;
  const botNumber = conn.user.id;
  const eligible = participants.filter(p => 
    p.id !== botNumber && 
    !p.id.includes(botNumber.split('@')[0])
  );
  
  if (eligible.length < 1) return;
  
  const randomBoy = eligible[Math.floor(Math.random() * eligible.length)];
  const boyName = randomBoy.notify || randomBoy.id.split('@')[0];
  const message = generateMessage('boy', boyName, randomBoy.id);
  
  await conn.sendMessage(from, { text: message, mentions: [randomBoy.id] }, { quoted: mek });
});