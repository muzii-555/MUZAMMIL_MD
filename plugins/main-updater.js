const { cmd } = require("../command");
const { sleep } = require("../lib/functions");
const { exec } = require("child_process");

cmd({
    pattern: "update",
    alias: ["upgrade", "sync", "refresh", "gitpull"],
    desc: "Update and restart MUZAMMIL-MD system",
    category: "owner",
    react: "🚀",
    filename: __filename
},
async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return reply("*📛 тнιs ιs αη σωηεя-σηℓү cσммαη∂!*");
        }

        // Initial message
        const updateMsg = await conn.sendMessage(from, {
            text: "ιηιтιαтιηg *MUZAMMIL-MD* sүsтεм υρ∂αтε...🚀"
        }, { quoted: mek });

        // Update steps
        const updateSteps = [
            "*🔍 cнєcкιηg MUZAMMIL-MD sтαтυs...*",
            "*🌐 ρυℓℓιηg ℓαтεѕт υρ∂αтєѕ (git pull)...*",
            "*📦 ιηѕтαℓℓιηg ηєω ραcкαgєѕ (npm install)...*",
            "*⚡ σρтιмιzιηg MUZAMMIL-MD ρєʀғσʀмαηcε...*",
            "*🔃 MUZAMMIL-MD ʀєѕταʀт ιηιтιαтє∂...*",
            "*♻️ ʀєѕταʀтιηg αℓℓ sεʀvιcεѕ...*"
        ];

        // Show steps with delay
        for (const step of updateSteps) {
            await sleep(1500);
            await conn.relayMessage(
                from,
                {
                    protocolMessage: {
                        key: updateMsg.key,
                        type: 14,
                        editedMessage: {
                            conversation: step
                        }
                    }
                },
                {}
            );

            // 🔥 Run commands at proper steps
            if (step.includes("git pull")) exec("git pull");
            if (step.includes("npm install")) exec("npm install --omit=dev");
        }

        // Final success message
        await conn.sendMessage(from, {
            text: "*✅ MUZAMMIL-MD υρ∂αтє cσмρℓєтє∂!\n♻️ αℓℓ ɮσтѕ ʀєѕταʀтιηg...*"
        }, { quoted: mek });

        // Restart ALL bots (new + old)
        await sleep(1000);
        exec("pm2 restart all && pm2 save");

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, {
            text:
`*❌ MUZAMMIL-MD UPDATE FAILED!*

_Error:_ ${e.message}

*Manual Fix:*
\`\`\`
git pull
npm install
pm2 restart all
\`\`\``
        }, { quoted: mek });
    }
});
