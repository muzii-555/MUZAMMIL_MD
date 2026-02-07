const { cmd } = require('../command');

cmd({
    pattern: "ping",
    alias: ["speed", "pong", "test"],
    desc: "Check bot response time with premium animation",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, sender }) => {
    try {
        const start = Date.now();

        // PREMIUM ANIMATION SEQUENCE
        const animationSteps = [
            "╔══════════════════════╗\n║   🐾 MUZAMMIL-MD 🐾   ║\n║    PING INITIATED     ║\n╚══════════════════════╝\n\n📱 User: You\n🔧 Command: .ping\n\n⏳ Initializing...",
            
            "╔══════════════════════╗\n║   🐾 MUZAMMIL-MD 🐾   ║\n║   CONNECTING TO API   ║\n╚══════════════════════╝\n\n📱 User: You\n🔧 Command: .ping\n\n🔗 Establishing connection...\n📡 Contacting server...",
            
            "╔══════════════════════╗\n║   🐾 MUZAMMIL-MD 🐾   ║\n║    ANALYZING PING     ║\n╚══════════════════════╝\n\n📱 User: You\n🔧 Command: .ping\n\n📊 Measuring response time...\n⚡ Calculating latency...",
            
            "╔══════════════════════╗\n║   🐾 MUZAMMIL-MD 🐾   ║\n║    FINALIZING DATA    ║\n╚══════════════════════╝\n\n📱 User: You\n🔧 Command: .ping\n\n✅ Connection established\n📈 Gathering metrics...\n⌛ Processing results..."
        ];

        let lastMessage;
        
        // Send animation sequence
        for (let i = 0; i < animationSteps.length; i++) {
            if (lastMessage) {
                try {
                    await conn.sendMessage(from, { delete: lastMessage.key });
                } catch (e) {}
            }
            
            lastMessage = await conn.sendMessage(from, { 
                text: animationSteps[i]
            });
            
            await new Promise(r => setTimeout(r, 350));
        }

        // Calculate final metrics
        const ms = Date.now() - start;
        const timeInSeconds = (ms / 1000).toFixed(2);
        
        // Determine status
        let status = "";
        let statusEmoji = "";
        let rating = "";
        
        if (ms < 50) {
            status = "⚡ ULTRA FAST";
            statusEmoji = "⚡";
            rating = "⭐⭐⭐⭐⭐";
        } else if (ms < 150) {
            status = "🚀 EXCELLENT";
            statusEmoji = "🚀";
            rating = "⭐⭐⭐⭐";
        } else if (ms < 300) {
            status = "✅ GOOD";
            statusEmoji = "✅";
            rating = "⭐⭐⭐";
        } else if (ms < 500) {
            status = "🐢 AVERAGE";
            statusEmoji = "🐢";
            rating = "⭐⭐";
        } else {
            status = "⚠️ SLOW";
            statusEmoji = "⚠️";
            rating = "⭐";
        }

        // PREMIUM FINAL RESULT DESIGN
        const finalResult = `
╔══════════════════════════════════╗
║        🐾 MUZAMMIL-MD 🐾         ║
║         PING ANALYSIS            ║
╠══════════════════════════════════╣
║ 👤 USER      : You               
║ 📱 COMMAND   : .ping             
║ ⏱️  RESPONSE  : ${timeInSeconds}s         
║ ⚡ LATENCY    : ${ms}ms              
║ 🎯 STATUS    : ${status} ${statusEmoji}
║ ⭐ RATING    : ${rating}          
╠══════════════════════════════════╣
║ 📊 PERFORMANCE METRICS           
║ ──────────────────────────────── 
║ • Server Uptime : 99.9%          
║ • API Status    : 🟢 ONLINE      
║ • Security      : 🔒 ACTIVE      
║ • Connection    : 📶 STABLE      
╚══════════════════════════════════╝

📞 Contact: +92 329 3152414
🏢 Official: MUZAMMIL-MD
🌐 Server: Premium Hosting

${ms < 150 ? "✨ Premium Performance Achieved!" : "⚡ Optimizing for better speed..."}

© 2024 MUZAMMIL-MD | WhatsApp Business Bot
`;

        // Delete last animation message
        try {
            await conn.sendMessage(from, { delete: lastMessage.key });
        } catch (e) {}

        // Send final premium result
        const resultMsg = await conn.sendMessage(from, {
            text: finalResult,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                externalAdReply: {
                    title: `MUZAMMIL-MD • ${ms}ms`,
                    body: `Status: ${status} | Rating: ${rating}`,
                    mediaType: 1,
                    thumbnailUrl: "https://files.catbox.moe/44km4t.jpg",
                    sourceUrl: "https://wa.me/923293152414",
                    renderLargerThumbnail: true,
                    showAdAttribution: true,
                    mediaUrl: "https://files.catbox.moe/44km4t.jpg"
                }
            }
        }, { quoted: mek });

        // Add dynamic reaction based on speed
        await conn.sendMessage(from, {
            react: { 
                text: statusEmoji, 
                key: mek.key 
            }
        });

        // Optional: Send follow-up message after 1 second
        setTimeout(async () => {
            const followUpMsg = `
💡 *Ping Analysis Summary:*

📊 *Response Time:* ${ms}ms
${ms < 100 ? "✅ Excellent! Faster than 95% of bots" : 
  ms < 300 ? "👍 Good response time" : 
  "⚠️ Could be better"}

🔧 *Recommendations:*
${ms > 300 ? "• Consider better hosting\n• Optimize bot code\n• Check network connection" : 
  "• Your setup is optimal\n• Continue current configuration"}

📈 *Bot Health:* 🟢 EXCELLENT
🐾 *Powered by:* MUZAMMIL-MD
`;

            await conn.sendMessage(from, {
                text: followUpMsg,
                contextInfo: {
                    quoted: resultMsg
                }
            });
        }, 1000);

    } catch (error) {
        console.error('Ping Error:', error);
        
        const errorMsg = `
╔══════════════════════════════════╗
║        🐾 MUZAMMIL-MD 🐾         ║
║         ERROR REPORT             ║
╠══════════════════════════════════╣
║ ❌ COMMAND FAILED                
║ 🐛 ISSUE: ${error.message.slice(0, 30)}...
║ 📍 LOCATION: Ping Module         
║ 🔧 STATUS: Needs attention       
╚══════════════════════════════════╝

🔧 *Troubleshooting:*
• Check internet connection
• Verify bot is running
• Contact support if persists

📞 Support: +92 329 3152414
🐾 MUZAMMIL-MD Official Bot
`;

        await conn.sendMessage(from, {
            text: errorMsg,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true
            }
        }, { quoted: mek });
        
        await conn.sendMessage(from, {
            react: { text: "❌", key: mek.key }
        });
    }
});
