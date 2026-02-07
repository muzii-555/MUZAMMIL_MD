const { cmd } = require('../command');

const botNameStyles = [
    "☠️ MUZAMMIL-MD ☠️",
    "꧁༒𝙈𝙐𝙕𝘼𝙈𝙈𝙄𝙇༒꧂",
    "𝙈𝙐𝙕𝘼𝙈𝙈𝙄𝙇_𝘿𝘼𝙍𝙆",
    "⛧ MUZAMMIL × HACKER ⛧",
    "🩸 MUZAMMIL-MD 🩸"
];

let i = 0;

cmd({
    pattern: "ping",
    alias: ["speed","pong"],
    desc: "Dark hacker ping",
    category: "main",
    react: "☠️",
    filename: __filename
},
async (conn, mek, m, { from, sender }) => {
    try {
        const start = Date.now();

        await conn.sendMessage(from, {
            react: { text: "☠️", key: mek.key }
        });

        // dark hacker delay
        await new Promise(r => setTimeout(r, 1000));

        const ms = Date.now() - start;

        const name = botNameStyles[i];
        i = (i + 1) % botNameStyles.length;

        const text = `
╔══════════════════════╗
║  ☠️  DARK SYSTEM  ☠️  ║
╠══════════════════════╣
║ 🧬 ACCESS : GRANTED
║ 🖥️ SERVER : ONLINE
║ ⚡ PING   : ${ms} ms
║ ⏳ TIME   : ${Math.floor(ms / 1000)}s
║
║ 💀 EXECUTING PAYLOAD...
║ ███████████▒▒▒ 85%
║
║ 🔐 SECURITY : BYPASSED
╚══════════════════════╝
⛧ POWERED BY ${name}
`;

        await conn.sendMessage(from, {
            text,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true
            }
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
    }
});