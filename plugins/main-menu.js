const config = require('../config')
const { cmd, commands } = require('../command');
const path = require('path'); 
const os = require("os")
const fs = require('fs');
const {runtime} = require('../lib/functions')
const axios = require('axios')

cmd({
    pattern: "menu2",
    alias: ["allmenu","fullmenu"],
    use: '.menu2',
    desc: "Show all bot commands",
    category: "menu",
    react: "📜",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 👑 *Owner:* MUZAMMIL
*│* 🔣 *Prefix:* [${config.PREFIX}]
*│* 🌐 *Platform:* Heroku
*│* 📦 *Version:* 5.0.0
*│* ⏱️ *Runtime:* ${runtime(process.uptime())}
*│*
*│* ─── *📥 DOWNLOAD MENU* ───
*│*
*│* 🟦 .facebook ➔ FB Video
*│* 📁 .mediafire ➔ MF Files
*│* 🎵 .tiktok ➔ TT Video
*│* 🐦 .twitter ➔ X Video
*│* 📷 .insta ➔ IG Video
*│* 📦 .apk ➔ APK File
*│* 🖼️ .img ➔ Image
*│* ▶️ .tt2 ➔ TT DL 2
*│* 📌 .pins ➔ Pinterest
*│* 🔄 .apk2 ➔ APK DL 2
*│* 🔵 .fb2 ➔ FB DL 2
*│* 📍 .pinterest ➔ Pin DL
*│* 🎶 .spotify ➔ Spotify
*│* 🎧 .play ➔ YT Audio
*│* 🎧 .play2 ➔ YT Audio 2
*│* 🔉 .audio ➔ Audio DL
*│* 🎬 .video ➔ YT Video
*│* 📹 .video2 ➔ YT Video 2
*│* 🎵 .ytmp3 ➔ YT to MP3
*│* 📹 .ytmp4 ➔ YT to MP4
*│* 🎶 .song ➔ Song DL
*│* 🎬 .darama ➔ Drama DL
*│* ☁️ .gdrive ➔ GDrive DL
*│* 🌐 .ssweb ➔ Screenshot
*│* 🎵 .tiks ➔ TT Audio
*│*
*│* ─── *👥 GROUP MENU* ───
*│*
*│* 🔗 .grouplink ➔ Get Link
*│* 🚪 .kickall ➔ Remove All
*│* 🚪 .kickall2 ➔ Remove All 2
*│* 🚪 .kickall3 ➔ Remove All 3
*│* ➕ .add ➔ Add Member
*│* ➖ .remove ➔ Remove
*│* 👢 .kick ➔ Kick User
*│* ⬆️ .promote ➔ Make Admin
*│* ⬇️ .demote ➔ Remove Admin
*│* 🚮 .dismiss ➔ Dismiss
*│* 🔄 .revoke ➔ Reset Link
*│* 👋 .setgoodbye ➔ Set Leave
*│* 🎉 .setwelcome ➔ Set Join
*│* 🗑️ .delete ➔ Delete Msg
*│* 🖼️ .getpic ➔ Get Group Pic
*│* ℹ️ .ginfo ➔ Group Info
*│* ⏳ .disappear on ➔ On Vanish
*│* ⏳ .disappear off ➔ Off Vanish
*│* ⏳ .disappear 7D,24H ➔ Set Time
*│* 📝 .allreq ➔ Accept All
*│* ✏️ .updategname ➔ Set Name
*│* 📝 .updategdesc ➔ Set Desc
*│* 📩 .joinrequests ➔ Requests
*│* 📨 .senddm ➔ Send DM
*│* 🏃 .nikal ➔ Leave
*│* 🔇 .mute ➔ Mute Group
*│* 🔊 .unmute ➔ Unmute
*│* 🔒 .lockgc ➔ Lock Group
*│* 🔓 .unlockgc ➔ Unlock
*│* 📩 .invite ➔ Invite Link
*│* #️⃣ .tag ➔ Tag User
*│* 🏷️ .hidetag ➔ Hide Tag
*│* @️⃣ .tagall ➔ Tag All
*│* 👔 .tagadmins ➔ Tag Admins
*│*
*│* ─── *🎭 REACTIONS MENU* ───
*│*
*│* 👊 .bully @tag ➔ Bully
*│* 🤗 .cuddle @tag ➔ Cuddle
*│* 😢 .cry @tag ➔ Cry
*│* 🤗 .hug @tag ➔ Hug
*│* 🐺 .awoo @tag ➔ Awoo
*│* 💋 .kiss @tag ➔ Kiss
*│* 👅 .lick @tag ➔ Lick
*│* 🖐️ .pat @tag ➔ Pat
*│* 😏 .smug @tag ➔ Smug
*│* 🔨 .bonk @tag ➔ Bonk
*│* 🚀 .yeet @tag ➔ Yeet
*│* 😊 .blush @tag ➔ Blush
*│* 😄 .smile @tag ➔ Smile
*│* 👋 .wave @tag ➔ Wave
*│* ✋ .highfive @tag ➔ Highfive
*│* 🤝 .handhold @tag ➔ Handhold
*│* 🍜 .nom @tag ➔ Nom
*│* 🦷 .bite @tag ➔ Bite
*│* 🤗 .glomp @tag ➔ Glomp
*│* 👋 .slap @tag ➔ Slap
*│* 💀 .kill @tag ➔ Kill
*│* 😊 .happy @tag ➔ Happy
*│* 😉 .wink @tag ➔ Wink
*│* 👉 .poke @tag ➔ Poke
*│* 💃 .dance @tag ➔ Dance
*│* 😬 .cringe @tag ➔ Cringe
*│*
*│* ─── *🎨 LOGO MAKER* ───
*│*
*│* 💡 .neonlight ➔ Neon
*│* 🎀 .blackpink ➔ BP
*│* 🐉 .dragonball ➔ DBZ
*│* 🎭 .3dcomic ➔ 3D Comic
*│* 🇺🇸 .america ➔ America
*│* 🍥 .naruto ➔ Naruto
*│* 😢 .sadgirl ➔ Sad Girl
*│* ☁️ .clouds ➔ Clouds
*│* 🚀 .futuristic ➔ Future
*│* 📜 .3dpaper ➔ 3D Paper
*│* ✏️ .eraser ➔ Eraser
*│* 🌇 .sunset ➔ Sunset
*│* 🍃 .leaf ➔ Leaf
*│* 🌌 .galaxy ➔ Galaxy
*│* 💀 .sans ➔ Sans
*│* 💥 .boom ➔ Boom
*│* 💻 .hacker ➔ Hacker
*│* 😈 .devilwings ➔ Devil
*│* 🇳🇬 .nigeria ➔ Nigeria
*│* 💡 .bulb ➔ Bulb
*│* 👼 .angelwings ➔ Angel
*│* ♈ .zodiac ➔ Zodiac
*│* 💎 .luxury ➔ Luxury
*│* 🎨 .paint ➔ Paint
*│* ❄️ .frozen ➔ Frozen
*│* 🏰 .castle ➔ Castle
*│* 🖋️ .tatoo ➔ Tattoo
*│* 🔫 .valorant ➔ Valorant
*│* 🐻 .bear ➔ Bear
*│* 🔠 .typography ➔ Typo
*│* 🎂 .birthday ➔ Bday
*│*
*│* ─── *👑 OWNER MENU* ───
*│*
*│* 👑 .owner ➔ Owner Info
*│* 📜 .menu ➔ Main Menu
*│* 📜 .menu2 ➔ Full Menu
*│* 📊 .vv ➔ VV
*│* 📋 .listcmd ➔ List CMD
*│* 📚 .allmenu ➔ All Menu
*│* 📦 .repo ➔ Repository
*│* 🚫 .block ➔ Block User
*│* ✅ .unblock ➔ Unblock
*│* 🖼️ .fullpp ➔ Full PP
*│* 🖼️ .setpp ➔ Set PP
*│* 🔄 .restart ➔ Restart
*│* ⏹️ .shutdown ➔ Shutdown
*│* 🔄 .updatecmd ➔ Update
*│* 💚 .alive ➔ Alive
*│* 🏓 .ping ➔ Ping
*│* 🆔 .gjid ➔ Group JID
*│* 🆔 .jid ➔ User JID
*│*
*│* ─── *🎉 FUN MENU* ───
*│*
*│* 🤪 .shapar ➔ Shapar
*│* ⭐ .rate ➔ Rate
*│* 🤬 .insult ➔ Insult
*│* 💻 .hack ➔ Hack Prank
*│* 💘 .ship ➔ Ship
*│* 🎭 .character ➔ Character
*│* 💌 .pickup ➔ Pickup Line
*│* 😆 .joke ➔ Joke
*│* ❤️ .hrt ➔ Heart
*│* 😊 .hpy ➔ Happy
*│* 😔 .syd ➔ Sad
*│* 😠 .anger ➔ Anger
*│* 😳 .shy ➔ Shy
*│* 💋 .kiss ➔ Kiss
*│* 🧐 .mon ➔ Mon
*│* 😕 .cunfuzed ➔ Confused
*│* ✋ .hand ➔ Hand
*│* 🤲 .hold ➔ Hold
*│* 🎵 .hifi ➔ HiFi
*│*
*│* ─── *🔄 CONVERT MENU* ───
*│*
*│* 🏷️ .sticker ➔ Sticker
*│* 🏷️ .sticker2 ➔ Sticker 2
*│* 😀 .emojimix ➔ Emoji Mix
*│* ✨ .fancy ➔ Fancy Text
*│* 🖼️ .take ➔ Take
*│* 🎵 .tomp3 ➔ To MP3
*│* 🗣️ .tts ➔ Text to Speech
*│* 🌐 .trt ➔ Translate
*│* 🔢 .base64 ➔ Base64
*│* 🔠 .unbase64 ➔ Unbase64
*│* 010 .binary ➔ Binary
*│* 🔤 .dbinary ➔ DBinary
*│* 🔗 .tinyurl ➔ TinyURL
*│* 🌐 .urldecode ➔ URL Decode
*│* 🌐 .urlencode ➔ URL Encode
*│* 🌐 .url ➔ URL Info
*│* 🔁 .repeat ➔ Repeat
*│* ❓ .ask ➔ Ask
*│* 📖 .readmore ➔ Read More
*│*
*│* ─── *🤖 AI MENU* ───
*│*
*│* 🧠 .ai ➔ AI Chat
*│* 🤖 .gpt3 ➔ GPT-3
*│* 🤖 .gpt2 ➔ GPT-2
*│* 🤖 .gptmini ➔ GPT Mini
*│* 🤖 .gpt ➔ GPT
*│* 🔵 .meta ➔ Meta AI
*│* 📦 .blackbox ➔ Blackbox
*│* 🌈 .luma ➔ Luma AI
*│* 🎧 .dj ➔ DJ AI
*│* 🧠 .gpt4 ➔ GPT-4
*│* 🔍 .bing ➔ Bing AI
*│* 🎨 .imagine ➔ Imagine
*│* 🖼️ .imagine2 ➔ Imagine 2
*│* 🤖 .copilot ➔ Copilot
*│*
*│* ─── *⚡ MAIN MENU* ───
*│*
*│* 🏓 .ping ➔ Ping
*│* 🏓 .ping2 ➔ Ping 2
*│* 🚀 .speed ➔ Speed Test
*│* 📡 .live ➔ Live Check
*│* 💚 .alive ➔ Alive
*│* ⏱️ .runtime ➔ Runtime
*│* ⏳ .uptime ➔ Uptime
*│* 📦 .repo ➔ Repository
*│* 👑 .owner ➔ Owner
*│* 📜 .menu ➔ Menu
*│* 📜 .menu2 ➔ Full Menu
*│* 🔄 .restart ➔ Restart
*│*
*│* ─── *🎎 ANIME MENU* ───
*│*
*│* 🤬 .fack ➔ Fack
*│* ✅ .truth ➔ Truth
*│* 😨 .dare ➔ Dare
*│* 🐶 .dog ➔ Dog Pic
*│* 🐺 .awoo ➔ Awoo
*│* 👧 .garl ➔ Garl
*│* 👰 .waifu ➔ Waifu
*│* 🐱 .neko ➔ Neko
*│* 🧙 .megumin ➔ Megumin
*│* 👗 .maid ➔ Maid
*│* 👧 .loli ➔ Loli
*│* 🎎 .animegirl ➔ Anime Girl
*│* 🎎 .animegirl1 ➔ Girl 1
*│* 🎎 .animegirl2 ➔ Girl 2
*│* 🎎 .animegirl3 ➔ Girl 3
*│* 🎎 .animegirl4 ➔ Girl 4
*│* 🎎 .animegirl5 ➔ Girl 5
*│* 🎬 .anime1 ➔ Anime 1
*│* 🎬 .anime2 ➔ Anime 2
*│* 🎬 .anime3 ➔ Anime 3
*│* 🎬 .anime4 ➔ Anime 4
*│* 🎬 .anime5 ➔ Anime 5
*│* 📰 .animenews ➔ Anime News
*│* 🦊 .foxgirl ➔ Fox Girl
*│* 🍥 .naruto ➔ Naruto
*│*
*│* ─── *ℹ️ OTHER MENU* ───
*│*
*│* 🕒 .timenow ➔ Time
*│* 📅 .date ➔ Date
*│* 🔢 .count ➔ Count
*│* 🧮 .calculate ➔ Calculate
*│* 🔢 .countx ➔ Count X
*│* 🎲 .flip ➔ Flip
*│* 🪙 .coinflip ➔ Coin Flip
*│* 🎨 .rcolor ➔ Random Color
*│* 🎲 .roll ➔ Roll Dice
*│* ℹ️ .fact ➔ Fact
*│* 💻 .cpp ➔ C++
*│* 🎲 .rw ➔ RW
*│* 💑 .pair ➔ Pair
*│* 💑 .pair2 ➔ Pair 2
*│* 💑 .pair3 ➔ Pair 3
*│* ✨ .fancy ➔ Fancy Text
*│* 🎨 .logo ➔ Logo Maker
*│* 📖 .define ➔ Define
*│* 📰 .news ➔ News
*│* 🎬 .movie ➔ Movie Info
*│* ☀️ .weather ➔ Weather
*│* 📦 .srepo ➔ Search Repo
*│* 💾 .save ➔ Save
*│* 🌐 .wikipedia ➔ Wikipedia
*│* 🔑 .gpass ➔ Password Gen
*│* 👤 .githubstalk ➔ GitHub
*│* 🔍 .yts ➔ YT Search
*│* 📹 .ytv ➔ YT Video
*│*
*│* 📌 *${config.DESCRIPTION || 'MUZAMMIL-MD WhatsApp Bot'}*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

        await conn.sendMessage(
            from,
            {
                image: { url: config.MENU_IMAGE_URL || 'https://files.catbox.moe/s3cve5.jpg' },
                caption: dec,
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
            },
            { quoted: mek }
        );

        // share local audio 
        const audioPath = path.join(__dirname, '../assets/menu.m4a');
        await conn.sendMessage(from, {
            audio: fs.readFileSync(audioPath),
            mimetype: 'audio/mp4',
            ptt: false,
        }, { quoted: mek });
        
    } catch (e) {
        console.log(e);
        reply(`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*\n*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*\n*│*\n*│* ❌ *Error:* ${e}\n*│*\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`);
    }
});