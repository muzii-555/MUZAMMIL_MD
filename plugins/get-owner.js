const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "owner",
    alias: ["creator", "dev", "contact"],
    react: "👑", 
    desc: "Get bot owner contact",
    category: "main",
    filename: __filename
}, 
async (conn, mek, m, { from, reply }) => {
    try {
        const ownerNumber = config.OWNER_NUMBER || "+923375626980";
        const ownerName = "MUZAMMIL";

        // vCard
        const vcard = 
`BEGIN:VCARD
VERSION:3.0
FN:${ownerName}
ORG: MUZAMMIL-MD;
TEL;type=CELL;type=VOICE;waid=${ownerNumber.replace('+', '')}:${ownerNumber}
END:VCARD`;

        // Styled caption message
        const caption = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 👑 *OWNER CONTACT*
*│*
*│* 📛 *Name:* ${ownerName}
*│* 📞 *Number:* ${ownerNumber}
*│* 🤖 *Bot:* MUZAMMIL-MD
*│*
*│* 💬 *Tap the contact below to chat!*
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

        // Add reaction
        await conn.sendMessage(from, { react: { text: "👑", key: m.key } });

        // Send styled text
        await conn.sendMessage(from, {
            text: caption,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363424043617436@newsletter',
                    newsletterName: 'MUZAMMIL-MD',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        // Send contact card
        await conn.sendMessage(from, {
            contacts: {
                displayName: ownerName,
                contacts: [{ vcard }]
            }
        }, { quoted: mek });

        // Send follow-up button if supported
        try {
            const buttonMessage = {
                text: `👑 *Need help? Contact the owner!*\n\nSave the contact and send a message.`,
                footer: "MUZAMMIL-MD",
                buttons: [
                    { buttonId: 'owner_help', buttonText: { displayText: '📞 Contact Owner' }, type: 1 },
                    { buttonId: 'owner_info', buttonText: { displayText: 'ℹ️ Bot Info' }, type: 1 }
                ],
                headerType: 1,
                viewOnce: true
            };
            await conn.sendMessage(from, buttonMessage);
        } catch (buttonError) {
            // Buttons not supported, skip
        }

    } catch (error) {
        console.error("OWNER CMD ERROR:", error);
        reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 👑 *OWNER COMMAND*
*│*
*│* ❌ *Error:* ${error.message}
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }
});

// Button handler for owner help
cmd({
    pattern: "owner_help",
    react: "📞",
    desc: "Owner contact help",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    const message = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📞 *CONTACT OWNER*
*│*
*│* 💬 *How to reach:*
*│* • Save the contact number
*│* • Send a WhatsApp message
*│* • Wait for response
*│*
*│* ⏰ *Response Time:* 24-48 hours
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;
    
    await conn.sendMessage(from, { text: message }, { quoted: mek });
});

// Button handler for bot info
cmd({
    pattern: "owner_info",
    react: "ℹ️",
    desc: "Bot information",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    const message = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🤖 *BOT INFORMATION*
*│*
*│* 📛 *Bot Name:* MUZAMMIL-MD
*│* 👑 *Owner:* MUZAMMIL
*│* 🔣 *Prefix:* ${config.PREFIX || '.'}
*│* ⚙️ *Mode:* ${config.MODE || 'Public'}
*│* 📦 *Version:* 5.0.0
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;
    
    await conn.sendMessage(from, { text: message }, { quoted: mek });
});