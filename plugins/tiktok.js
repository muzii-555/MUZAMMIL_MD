const fetch = require("node-fetch");
const { cmd } = require("../command");

/* ========= CONFIG ========= */

const CONFIG = {
    api: "https://arslanmd-api.vercel.app/api/ttdl?url=",
    cooldown: 4000
};

let lastUsed = 0;

function isCooldown() {
    return Date.now() - lastUsed < CONFIG.cooldown;
}

function activateCooldown() {
    lastUsed = Date.now();
}

function isValidTikTok(url) {
    return /tiktok\.com/.test(url);
}

/* ========= COMMAND ========= */

cmd({
    pattern: "tt",
    alias: ["tiktok", "ttdl"],
    desc: "MUZAMMIL-MD VIP TikTok Downloader",
    category: "download",
    react: "🎬",
    filename: __filename
},
async (conn, mek, m, { from, reply, q, sender, pushname }) => {

    try {

        if (!q)
            return reply("❌ Provide TikTok URL\nExample:\n.tt https://tiktok.com/xxxx");

        if (!isValidTikTok(q))
            return reply("❌ Invalid TikTok URL");

        if (isCooldown())
            return reply("⏳ Wait a few seconds before using again.");

        activateCooldown();

        await conn.sendMessage(from, {
            react: { text: "⏳", key: m.key }
        });

        const res = await fetch(CONFIG.api + encodeURIComponent(q));
        const data = await res.json();

        if (!data || !data.status)
            throw new Error("API response invalid");

        const videoUrl =
            data.data?.hd ||
            data.data?.play ||
            data.data?.nowm;

        if (!videoUrl)
            throw new Error("Video not found");

        const quality = data.data?.hd ? "HD Quality" : "Standard Quality";
        const title = data.data?.title || "No Title";
        const views = data.data?.views || "N/A";

        const box = `
╭─────────────────────────────╮
│        🎬  MUZAMMIL-MD VIP        │
├─────────────────────────────┤
│ 👤 User     : ${pushname}
│ 🆔 User ID  : ${sender.split("@")[0]}
│
│ 📥 Status   : Download Ready
│ 🎞 Quality  : ${quality}
│ 👀 Views    : ${views}
├─────────────────────────────┤
│ 📝 Title :
│ ${title}
├─────────────────────────────┤
│ ⚡ Powered By MUZAMMIL-MD
╰─────────────────────────────╯
`.trim();

        await conn.sendMessage(from, {
            video: { url: videoUrl },
            caption: box
        }, { quoted: mek });

        await conn.sendMessage(from, {
            react: { text: "✅", key: m.key }
        });

    } catch (err) {

        await conn.sendMessage(from, {
            react: { text: "❌", key: m.key }
        });

        reply(`
╭────────────────────╮
│    ❌ DOWNLOAD FAILED    │
╰────────────────────╯

${err.message}
        `.trim());
    }
});
