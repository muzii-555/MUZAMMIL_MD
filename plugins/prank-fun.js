const { cmd } = require('../command');

cmd({
    pattern: "hack",
    alias: ["hacking", "prank", "hackprank"],
    desc: "Displays a dynamic and playful 'Hacking' message for fun.",
    category: "fun",
    react: "💻",
    filename: __filename
},
async (conn, mek, m, { 
    from, args, reply, sender 
}) => {
    try {
        // Get target user (optional)
        let target = args[0] || sender.split('@')[0];
        
        // Add reaction
        await conn.sendMessage(from, { react: { text: '💻', key: m.key } });

        const steps = [
            `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`,
            `*│* 💻 *INITIATING HACK SEQUENCE*`,
            `*│* 🎯 *Target:* @${target}`,
            `*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`,
            
            `*│* 🔍 *Scanning for vulnerabilities...*`,
            `*│* 🌐 *Connecting to target device...*`,
            
            `*│* [▓▓░░░░░░░░] 20% - Bypassing firewall`,
            `*│* [▓▓▓▓░░░░░░] 35% - Cracking passwords`,
            `*│* [▓▓▓▓▓▓░░░░] 50% - Accessing mainframe`,
            `*│* [▓▓▓▓▓▓▓▓░░] 65% - Decrypting data`,
            `*│* [▓▓▓▓▓▓▓▓▓▓] 80% - Extracting files`,
            `*│* [▓▓▓▓▓▓▓▓▓▓] 95% - Covering tracks`,
            `*│* [██████████] 100% - HACK COMPLETE ✅`,
            
            `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`,
            `*│* 🔓 *BREACH SUCCESSFUL!*`,
            `*│* 📱 *Device:* ${getRandomDevice()}`,
            `*│* 📡 *IP:* ${getRandomIP()}`,
            `*│* 🗺️ *Location:* ${getRandomLocation()}`,
            `*│* 📧 *Email:* ${target}${getRandomEmail()}`,
            `*│* 🔑 *Password:* ${getRandomPassword()}`,
            `*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`,
            
            `*│* ⚠️ *JUST A PRANK!* 😄`,
            `*│* 🔒 *Your data is 100% safe!*`,
            `*│* 🛡️ *Stay secure online!*`,
            
            `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`,
            `*│* 📌 *Powered by MUZAMMIL-MD*`,
            `*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        ];

        // Send first message
        let lastMsg = await conn.sendMessage(from, { 
            text: steps[0],
            mentions: target.includes('@') ? [target + '@s.whatsapp.net'] : []
        }, { quoted: mek });

        // Send remaining steps with animation
        for (let i = 1; i < steps.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Edit previous message instead of sending new one
            if (i < 3) {
                lastMsg = await conn.sendMessage(from, { 
                    text: steps[i],
                    mentions: target.includes('@') ? [target + '@s.whatsapp.net'] : []
                }, { quoted: mek });
            } else {
                // For progress steps, edit the same message
                try {
                    await conn.sendMessage(from, {
                        text: steps[i],
                        edit: lastMsg.key
                    });
                } catch {
                    lastMsg = await conn.sendMessage(from, { 
                        text: steps[i],
                        mentions: target.includes('@') ? [target + '@s.whatsapp.net'] : []
                    }, { quoted: mek });
                }
            }
        }

        // Final reaction
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (e) {
        console.error(e);
        reply(`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❌ *Error:* ${e.message}\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`);
    }
});

// Helper functions for random data
function getRandomDevice() {
    const devices = [
        'iPhone 15 Pro Max', 'Samsung Galaxy S24 Ultra', 'Google Pixel 8 Pro',
        'OnePlus 12', 'Xiaomi 14 Pro', 'MacBook Pro M3', 'Windows 11 PC',
        'iPad Pro', 'Samsung Tab S9', 'Nothing Phone 2'
    ];
    return devices[Math.floor(Math.random() * devices.length)];
}

function getRandomIP() {
    return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
}

function getRandomLocation() {
    const cities = [
        'Karachi, Pakistan', 'Lahore, Pakistan', 'Islamabad, Pakistan',
        'New York, USA', 'London, UK', 'Toronto, Canada', 'Dubai, UAE',
        'Mumbai, India', 'Sydney, Australia', 'Tokyo, Japan'
    ];
    return cities[Math.floor(Math.random() * cities.length)];
}

function getRandomEmail() {
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'proton.me'];
    return `@${domains[Math.floor(Math.random() * domains.length)]}`;
}

function getRandomPassword() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';
    let password = '';
    for (let i = 0; i < 10; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }
    return password;
}