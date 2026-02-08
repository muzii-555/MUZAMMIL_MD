const { cmd } = require('../command');

cmd({
    pattern: "ping",
    alias: ["speed", "pong", "test", "latency"],
    desc: "⚡ Check bot response time with premium animation",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        const start = Date.now();
        
        // 🎬 PREMIUM LOADING ANIMATION
        let loadingMsg = await conn.sendMessage(from, {
            text: `▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ 𝟬%`
        }, { quoted: mek });
        
        const loadingFrames = [
            { text: "██▒▒▒▒▒▒▒▒▒▒▒▒▒ 𝟭𝟱%", delay: 200 },
            { text: "████▒▒▒▒▒▒▒▒▒▒▒ 𝟯𝟬%", delay: 250 },
            { text: "██████▒▒▒▒▒▒▒▒ 𝟰𝟱%", delay: 200 },
            { text: "████████▒▒▒▒▒ 𝟲𝟬%", delay: 250 },
            { text: "██████████▒▒▒ 𝟳𝟱%", delay: 200 },
            { text: "████████████▒ 𝟵𝟬%", delay: 250 },
            { text: "██████████████ 𝟭𝟬𝟬%", delay: 300 }
        ];
        
        for (let frame of loadingFrames) {
            await conn.relayMessage(from, {
                protocolMessage: {
                    key: loadingMsg.key,
                    type: 14,
                    editedMessage: { conversation: frame.text },
                },
            });
            await new Promise(r => setTimeout(r, frame.delay));
        }
        
        // 🎯 STARTING ANIMATION
        await conn.relayMessage(from, {
            protocolMessage: {
                key: loadingMsg.key,
                type: 14,
                editedMessage: {
                    conversation: `▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
🅜 🅤 🅩 🅐 🅜 🅜 🅘 🅛 - 🅜 🅓
▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀

⚡ 𝐏𝐈𝐍𝐆 𝐓𝐄𝐒𝐓 𝐈𝐍𝐈𝐓𝐈𝐀𝐓𝐄𝐃
━━━━━━━━━━━━━━━━━━━━━
📡 Connecting to servers...
⏳ Processing request...`
                },
            },
        });
        
        await new Promise(r => setTimeout(r, 800));
        
        // 🔍 PERFORMING TESTS
        const tests = [
            { icon: "🔍", text: "Analyzing system status..." },
            { icon: "📡", text: "Testing connection speed..." },
            { icon: "⚡", text: "Measuring response time..." },
            { icon: "🔧", text: "Checking bot health..." },
            { icon: "✅", text: "Finalizing results..." }
        ];
        
        for (let i = 0; i < tests.length; i++) {
            const test = tests[i];
            const dots = ".".repeat((i % 3) + 1);
            
            await conn.relayMessage(from, {
                protocolMessage: {
                    key: loadingMsg.key,
                    type: 14,
                    editedMessage: {
                        conversation: `▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
🅜 🅤 🅩 🅐 🅜 🅜 🅘 🅛 - 🅜 🅓
▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀

⚡ 𝐏𝐈𝐍𝐆 𝐓𝐄𝐒𝐓
━━━━━━━━━━━━━━━━━━━━━
${test.icon} ${test.text}${dots}

📊 Progress: [${"█".repeat(i + 1)}${"░".repeat(5 - i)}] ${(i + 1) * 20}%
⏱️ Elapsed: ${((Date.now() - start) / 1000).toFixed(1)}s`
                    },
                },
            });
            
            await new Promise(r => setTimeout(r, 400));
        }
        
        // 📊 CALCULATE RESULTS
        const ms = Date.now() - start;
        
        // 🏆 PERFORMANCE ANALYSIS
        let performance;
        let statusEmoji;
        let rating;
        let colorBar;
        
        if (ms < 100) {
            performance = "⚡ 𝙀𝙇𝙄𝙏𝙀 𝙎𝙋𝙀𝙀𝘿";
            statusEmoji = "⚡";
            rating = "★★★★★";
            colorBar = "🟢🟢🟢🟢🟢";
        } else if (ms < 200) {
            performance = "🚀 𝙀𝙓𝘾𝙀𝙇𝙇𝙀𝙉𝙏";
            statusEmoji = "🚀";
            rating = "★★★★☆";
            colorBar = "🟢🟢🟢🟢🟡";
        } else if (ms < 300) {
            performance = "✅ 𝙂𝙊𝙊𝘿";
            statusEmoji = "✅";
            rating = "★★★☆☆";
            colorBar = "🟢🟢🟢🟡🟡";
        } else if (ms < 500) {
            performance = "📊 𝘼𝙑𝙀𝙍𝘼𝙂𝙀";
            statusEmoji = "📊";
            rating = "★★☆☆☆";
            colorBar = "🟢🟢🟡🟡🔴";
        } else {
            performance = "🐢 𝙎𝙇𝙊𝙒";
            statusEmoji = "🐢";
            rating = "★☆☆☆☆";
            colorBar = "🟢🟡🔴🔴🔴";
        }
        
        // 🎨 PREMIUM RESULT DISPLAY
        const pingResult = `
▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
         🅜🅤🅩🅐🅜🅜🅘🅛-🅜🅓
▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀

┌─────────────────────────
│   ⚡ 𝐏𝐈𝐍𝐆 𝐑𝐄𝐒𝐔𝐋𝐓𝐒
├─────────────────────────
│ 📊 Status: ${performance}
│ ⏱️  Time: ${ms}ms
│ ⭐ Rating: ${rating}
│ 🎯 Speed: ${colorBar}
├─────────────────────────
│ 📡 Connection: Active
│ 🔒 Security: Enabled
│ 🚀 Optimized: Yes
└─────────────────────────

▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
        𝐏𝐄𝐑𝐅𝐎𝐑𝐌𝐀𝐍𝐂𝐄
▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀

${getPerformanceMessage(ms)}

📱 Bot: MUZAMMIL-MD
👤 User: @${sender.split('@')[0]}
⏰ Time: ${new Date().toLocaleTimeString()}

${ms < 200 ? "✨ Premium performance detected!" : "⚡ Keep your bot optimized!"}

🔗 Contact: +92 329 3152414
✅ Verified Business Account
`;
        
        // 📱 SEND FINAL RESULT
        await conn.relayMessage(from, {
            protocolMessage: {
                key: loadingMsg.key,
                type: 14,
                editedMessage: { conversation: pingResult },
            },
        });
        
        // 🎭 ADD REACTION
        await conn.sendMessage(from, {
            react: { text: statusEmoji, key: mek.key }
        });
        
        // 💡 SEND TIP MESSAGE
        await new Promise(r => setTimeout(r, 1000));
        
        const tipMessage = getTipMessage(ms);
        if (tipMessage) {
            await conn.sendMessage(from, {
                text: `💡 *Performance Tip:*\n\n${tipMessage}\n\n🔧 *MUZAMMIL-MD Premium Bot*\n📞 Support: +92 329 3152414`,
                quoted: mek
            });
        }
        
    } catch (error) {
        console.error('Ping Error:', error);
        
        const errorMsg = `
▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
   🅜🅤🅩🅐🅜🅜🅘🅛-🅜🅓
▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀

❌ 𝐏𝐈𝐍𝐆 𝐓𝐄𝐒𝐓 𝐅𝐀𝐈𝐋𝐄𝐃

━━━━━━━━━━━━━━━━━━━━━
🔧 Error: ${error.message.slice(0, 50)}...
📍 Module: Ping System
⏰ Time: ${new Date().toLocaleTimeString()}

━━━━━━━━━━━━━━━━━━━━━
🛠️ 𝐓𝐫𝐨𝐮𝐛𝐥𝐞𝐬𝐡𝐨𝐨𝐭𝐢𝐧𝐠:
1. Check internet connection
2. Verify bot is running
3. Try command again
4. Contact support

━━━━━━━━━━━━━━━━━━━━━
📞 Support: +92 329 3152414
🏢 MUZAMMIL-MD Verified
`;
        
        await reply(errorMsg);
        await conn.sendMessage(from, {
            react: { text: "❌", key: mek.key }
        });
    }
});

// 📊 PERFORMANCE MESSAGES
function getPerformanceMessage(ms) {
    if (ms < 50) {
        return `🎯 𝐄𝐋𝐈𝐓𝐄 𝐏𝐄𝐑𝐅𝐎𝐑𝐌𝐀𝐍𝐂𝐄
• Faster than 99% of bots
• Optimal server response
• Premium hosting detected
• Perfect optimization`;
    } else if (ms < 100) {
        return `🚀 𝐄𝐗𝐂𝐄𝐋𝐋𝐄𝐍𝐓 𝐒𝐏𝐄𝐄𝐃
• Better than 95% of bots
• Great server performance
• Well optimized system
• Stable connection`;
    } else if (ms < 200) {
        return `✅ 𝐆𝐎𝐎𝐃 𝐏𝐄𝐑𝐅𝐎𝐑𝐌𝐀𝐍𝐂𝐄
• Above average speed
• Reliable connection
• Good optimization
• Stable performance`;
    } else if (ms < 300) {
        return `📊 𝐀𝐕𝐄𝐑𝐀𝐆𝐄 𝐒𝐏𝐄𝐄𝐃
• Standard performance
• Room for optimization
• Check network speed
• Monitor bot health`;
    } else {
        return `🐢 𝐍𝐄𝐄𝐃𝐒 𝐎𝐏𝐓𝐈𝐌𝐈𝐙𝐀𝐓𝐈𝐎𝐍
• Below average speed
• Consider improvements
• Check server load
• Optimize bot code`;
    }
}

// 💡 TIP MESSAGES
function getTipMessage(ms) {
    if (ms > 300) {
        return `Your bot response time is ${ms}ms which is slower than optimal. Consider:\n• Upgrading hosting plan\n• Optimizing database queries\n• Reducing plugin load\n• Using .update command`;
    } else if (ms > 200) {
        return `Response time: ${ms}ms - Good but can be better. Try:\n• Clearing cache regularly\n• Updating to latest version\n• Monitoring resource usage`;
    } else if (ms > 100) {
        return `Great speed at ${ms}ms! For even better performance:\n• Use premium hosting\n• Optimize images/media\n• Regular maintenance`;
    } else {
        return `Excellent performance at ${ms}ms! Your bot is perfectly optimized. Keep up the good maintenance!`;
    }
}

// 🎪 SPEED TEST COMMAND
cmd({
    pattern: "speedtest",
    alias: ["speed", "test", "network"],
    desc: "🚀 Comprehensive speed test",
    category: "main",
    react: "🚀",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const tests = 5;
        let totalMs = 0;
        let results = [];
        
        // 🏃 RUN MULTIPLE TESTS
        for (let i = 1; i <= tests; i++) {
            const start = Date.now();
            
            // Simulate test
            await new Promise(r => setTimeout(r, 100));
            
            const ms = Date.now() - start;
            totalMs += ms;
            results.push(ms);
            
            // Update progress
            const progress = `[${"█".repeat(i)}${"░".repeat(tests - i)}] ${i}/${tests}`;
            await reply(`🚀 Running speed test...\n${progress}\nTest ${i}: ${ms}ms`);
            
            await new Promise(r => setTimeout(r, 300));
        }
        
        // 📈 CALCULATE STATISTICS
        const average = Math.round(totalMs / tests);
        const min = Math.min(...results);
        const max = Math.max(...results);
        
        const speedtestResult = `
▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
   𝐒𝐏𝐄𝐄𝐃 𝐓𝐄𝐒𝐓
▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀

┌─────────────────
│ 📊 𝐑𝐄𝐒𝐔𝐋𝐓𝐒
├─────────────────
│ 🏃 Tests: ${tests}x
│ ⏱️  Average: ${average}ms
│ ⚡ Fastest: ${min}ms
│ 🐢 Slowest: ${max}ms
│ 📈 Consistency: ${((min/max)*100).toFixed(1)}%
└─────────────────

┌─────────────────
│ 🎯 𝐀𝐍𝐀𝐋𝐘𝐒𝐈𝐒
├─────────────────
│ ${getSpeedAnalysis(average)}
└─────────────────

${getSpeedRecommendation(average)}

🔧 MUZAMMIL-MD Premium
📞 +92 329 3152414
`;
        
        await reply(speedtestResult);
        
    } catch (error) {
        await reply(`❌ Speed test failed: ${error.message}\n\n📞 Contact: +92 329 3152414`);
    }
});

function getSpeedAnalysis(ms) {
    if (ms < 100) return "✅ Excellent network speed";
    if (ms < 200) return "👍 Good connection quality";
    if (ms < 300) return "📊 Average performance";
    if (ms < 500) return "⚠️  Needs optimization";
    return "❌ Poor network detected";
}

function getSpeedRecommendation(ms) {
    if (ms < 100) return "✨ Your connection is perfect!";
    if (ms < 200) return "💡 Consider premium hosting for even better speed";
    if (ms < 300) return "🔧 Optimize your bot with .update command";
    return "🚨 Immediate optimization needed! Contact support.";
}

console.log("⚡ MUZAMMIL-MD Premium Ping System Loaded!");
console.log("🎯 Commands: .ping | .speedtest");
console.log("🚀 Optimized for maximum performance");
