const { cmd } = require('../command');
const os = require('os');
const { performance } = require('perf_hooks');
const { exec } = require('child_process');
const config = require('../config');
const { runtime } = require('../lib/functions');

// Helper function to calculate CPU usage
async function getCpuUsage() {
    const startCpu = os.cpus().map(cpu => cpu.times);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const endCpu = os.cpus().map(cpu => cpu.times);
    
    const cpuUsage = endCpu.map((cpu, i) => {
        const startTotal = Object.values(startCpu[i]).reduce((a, b) => a + b, 0);
        const endTotal = Object.values(cpu).reduce((a, b) => a + b, 0);
        const totalDiff = endTotal - startTotal;
        const idleDiff = cpu.idle - startCpu[i].idle;
        return Math.round(100 - (idleDiff / totalDiff) * 100);
    });
    
    return cpuUsage.reduce((a, b) => a + b, 0) / cpuUsage.length;
}

// Helper function to get disk space
async function getDiskSpace() {
    return new Promise((resolve) => {
        exec("df -h /", (error, stdout) => {
            if (error) return resolve("N/A");
            const lines = stdout.trim().split("\n");
            if (lines.length > 1) {
                const parts = lines[1].split(/\s+/);
                resolve({ used: parts[2], total: parts[1], percent: parts[4] });
            } else {
                resolve({ used: "N/A", total: "N/A", percent: "N/A" });
            }
        });
    });
}

// Helper function to get network info
function getNetworkInfo() {
    const networkInfo = os.networkInterfaces();
    let ipAddress = "N/A";
    let macAddress = "N/A";
    
    Object.keys(networkInfo).forEach(interface => {
        networkInfo[interface].forEach(details => {
            if (details.family === 'IPv4' && !details.internal) {
                ipAddress = details.address;
                macAddress = details.mac || "N/A";
            }
        });
    });
    
    return { ip: ipAddress, mac: macAddress };
}

// Helper function to format bytes
function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Helper function to get CPU load average
function getLoadAverage() {
    const load = os.loadavg();
    return `${load[0].toFixed(2)}, ${load[1].toFixed(2)}, ${load[2].toFixed(2)}`;
}

cmd({
    pattern: "sysinfo",
    alias: ["systeminfo", "serverinfo", "status", "sys", "system"],
    desc: "Display detailed system information of the bot server",
    category: "info",
    react: "📊",
    filename: __filename
},
async (conn, mek, m, { from, reply, sender }) => {
    try {
        // Add reaction
        await conn.sendMessage(from, { react: { text: '📊', key: m.key } });
        
        // Send loading message
        const loadingMsg = await conn.sendMessage(from, {
            text: `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* 📊 *Fetching system info...*\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        }, { quoted: mek });

        // Gather system information
        const startTime = performance.now();
        
        const cpuUsage = await getCpuUsage();
        const diskInfo = await getDiskSpace();
        const network = getNetworkInfo();
        const loadAvg = getLoadAverage();
        
        // Memory calculations
        const totalMem = os.totalmem();
        const freeMem = os.freemem();
        const usedMem = totalMem - freeMem;
        const memPercent = Math.round((usedMem / totalMem) * 100);
        
        // Uptime
        const sysUptime = Math.floor(os.uptime());
        const sysUptimeStr = runtime(sysUptime);
        const botUptime = Math.floor(process.uptime());
        const botUptimeStr = runtime(botUptime);
        
        // CPU info
        const cpuModel = os.cpus()[0]?.model || 'Unknown';
        const cpuCores = os.cpus().length;
        const cpuSpeed = os.cpus()[0]?.speed || 0;
        
        // Node.js info
        const nodeVersion = process.version;
        const platform = `${os.platform()} ${os.arch()}`;
        const hostname = os.hostname();
        
        // Bot info
        const botName = "MUZAMMIL-MD";
        const botVersion = config.VERSION || "5.0.0";
        const prefix = config.PREFIX || '.';
        
        // API response time
        const apiLatency = Math.round(performance.now() - startTime);
        const rating = apiLatency < 100 ? '🟢' : apiLatency < 200 ? '🟡' : '🔴';

        const sysInfoMessage = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📊 *SYSTEM INFORMATION*
*│*
*│* 🤖 *Bot Info*
*│* ├─ Name: ${botName}
*│* ├─ Version: v${botVersion}
*│* ├─ Prefix: ${prefix}
*│* └─ Response: ${apiLatency}ms ${rating}
*│*
*│* ⏱️ *Uptime*
*│* ├─ System: ${sysUptimeStr}
*│* └─ Bot: ${botUptimeStr}
*│*
*│* 💻 *CPU*
*│* ├─ Model: ${cpuModel.split('@')[0].slice(0, 35)}...
*│* ├─ Cores: ${cpuCores} @ ${cpuSpeed}MHz
*│* ├─ Usage: ${cpuUsage.toFixed(1)}%
*│* └─ Load Avg: ${loadAvg}
*│*
*│* 💾 *Memory*
*│* ├─ Total: ${formatBytes(totalMem)}
*│* ├─ Used: ${formatBytes(usedMem)}
*│* ├─ Free: ${formatBytes(freeMem)}
*│* └─ Usage: ${memPercent}%
*│*
*│* 💿 *Storage*
*│* ├─ Used: ${diskInfo.used}B
*│* ├─ Total: ${diskInfo.total}B
*│* └─ Usage: ${diskInfo.percent}
*│*
*│* 🌐 *Network*
*│* ├─ Hostname: ${hostname}
*│* ├─ Platform: ${platform}
*│* ├─ IP: ${network.ip}
*│* └─ MAC: ${network.mac}
*│*
*│* 🛠️ *Environment*
*│* ├─ Node.js: ${nodeVersion}
*│* ├─ OS: ${os.type()} ${os.release()}
*│* └─ Shell: ${process.env.SHELL?.split('/').pop() || 'N/A'}
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

        // Edit loading message with results
        await conn.sendMessage(from, {
            text: sysInfoMessage,
            edit: loadingMsg.key,
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
        });

        // Success reaction
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (e) {
        console.error("Sysinfo Command Error:", e);
        reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 📊 *SYSTEM INFORMATION*
*│*
*│* ❌ Failed to fetch system details!
*│* Please try again later.
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }
});