const config = require('../config');
const { cmd, commands } = require('../command');
const { performance } = require('perf_hooks');
const os = require('os');

// Array of different fancy text styles for MUZAMMIL-MD
const botNameStyles = [
    "𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋-𝐌𝐃",
    "𝕄𝕌ℤ𝔸𝕄𝕄𝕀𝕃-𝕄𝔻",
    "𝙈𝙐𝙕𝘼𝙈𝙈𝙄𝙇-𝙈𝘿",
    "𝗠𝗨𝗭𝗔𝗠𝗠𝗜𝗟-𝗠𝗗",
    "M̷U̷Z̷A̷M̷M̷I̷L̷-M̷D̷",
    "ⓂⓊⓏⒶⓂⓂⒾⓁ-ⓂⒹ",
    "𝓜𝓤𝓩𝓐𝓜𝓜𝓘𝓛-𝓜𝓓"
];

// Track current style index
let currentStyleIndex = 0;

// Uptime formatter
function formatUptime(seconds) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m ${secs}s`;
    if (hours > 0) return `${hours}h ${minutes}m ${secs}s`;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
}

// Speed rating function
function getSpeedRating(ping) {
    if (ping < 50) return { text: '🚀 EXCELLENT', emoji: '💚' };
    if (ping < 100) return { text: '⚡ VERY FAST', emoji: '💙' };
    if (ping < 200) return { text: '✅ GOOD', emoji: '💛' };
    if (ping < 400) return { text: '⚠️ AVERAGE', emoji: '🧡' };
    return { text: '🐢 SLOW', emoji: '❤️' };
}

// Progress bar generator
function getProgressBar(ping, maxPing = 500) {
    const percentage = Math.min(ping / maxPing, 1);
    const filled = Math.round(percentage * 8);
    const empty = 8 - filled;
    
    if (ping < 100) return '🟢'.repeat(filled) + '⬜'.repeat(empty);
    if (ping < 200) return '🟡'.repeat(filled) + '⬜'.repeat(empty);
    if (ping < 400) return '🟠'.repeat(filled) + '⬜'.repeat(empty);
    return '🔴'.repeat(filled) + '⬜'.repeat(empty);
}

cmd({
    pattern: "ping",
    alias: ["speed", "pong", "ms", "latency"],
    use: '.ping',
    desc: "Check bot's response time and uptime.",
    category: "main",
    react: "🏓",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        // Initial reaction
        await conn.sendMessage(from, { react: { text: '🏓', key: mek.key } });
        
        // Start timing
        const startTime = performance.now();
        
        // Send initial message
        const initialMsg = await conn.sendMessage(from, {
            text: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🏓 *TESTING CONNECTION...*
*│*
*│* ⏳ Calculating ping...
*│*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        }, { quoted: mek });

        // Calculate ping
        const endTime = performance.now();
        const ping = Math.round(endTime - startTime);
        
        // Get uptime
        const botUptime = formatUptime(process.uptime());
        const sysUptime = formatUptime(os.uptime());
        
        // Get fancy bot name
        const fancyBotName = botNameStyles[currentStyleIndex];
        currentStyleIndex = (currentStyleIndex + 1) % botNameStyles.length;
        
        // Get speed rating and progress bar
        const speedRating = getSpeedRating(ping);
        const progressBar = getProgressBar(ping);
        
        // RAM usage
        const ramUsed = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1);
        const ramTotal = (os.totalmem() / 1024 / 1024 / 1024).toFixed(1);
        
        // Status icon
        const statusIcon = ping < 100 ? '🟢' : ping < 200 ? '🟡' : ping < 400 ? '🟠' : '🔴';
        
        // Build final message
        const finalText = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* ${statusIcon} *BOT STATUS*
*│*
*│* 🤖 *Bot:* ${fancyBotName}
*│* ⚡ *Ping:* ${ping}ms
*│* 📶 *Speed:* ${progressBar}
*│* 🏷️ *Rating:* ${speedRating.text} ${speedRating.emoji}
*│*
*│* ⏱️ *Bot Uptime:* ${botUptime}
*│* 🖥️ *System Uptime:* ${sysUptime}
*│* 💾 *RAM:* ${ramUsed}MB / ${ramTotal}GB
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

        // Edit the initial message with results
        await conn.sendMessage(from, {
            text: finalText,
            edit: initialMsg.key,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363424043617436@newsletter',
                    newsletterName: "MUZAMMIL-MD",
                    serverMessageId: 143
                }
            }
        });

        // Final reaction based on speed
        const finalEmoji = ping < 100 ? '🚀' : ping < 200 ? '⚡' : '✅';
        await conn.sendMessage(from, { react: { text: finalEmoji, key: mek.key } });

    } catch (e) {
        console.error("Error in ping command:", e);
        reply(`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*\n*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*\n*│*\n*│* ❌ *Error:* ${e.message}\n*│*\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`);
    }
});

// Simple Ping (Quick Version)
cmd({
    pattern: "ping2",
    alias: ["quickping", "fp"],
    use: '.ping2',
    desc: "Quick bot response time check.",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        const startTime = performance.now();
        await conn.sendMessage(from, { react: { text: '⚡', key: mek.key } });
        const ping = Math.round(performance.now() - startTime);
        const uptime = formatUptime(process.uptime());
        
        const text = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ⚡ *Ping:* ${ping}ms | ⏱️ *Uptime:* ${uptime}\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;
        
        await conn.sendMessage(from, { text }, { quoted: mek });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});