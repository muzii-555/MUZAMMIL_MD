//---------------------------------------------------------------------------
//           MUZAMMIL-MD  
//---------------------------------------------------------------------------
//  ⚠️ DO NOT MODIFY THIS FILE ⚠️  
//---------------------------------------------------------------------------
const { cmd, commands } = require('../command');
const config = require('../config');
const prefix = config.PREFIX;
const fs = require('fs');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson } = require('../lib/functions2');
const { writeFileSync } = require('fs');
const path = require('path');

cmd({
    pattern: "admin-events",
    alias: ["adminevents"],
    desc: "Enable or disable admin event notifications",
    category: "settings",
    filename: __filename
},
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* ⚙️ *SETTINGS*
*│*
*│* 📛 *Owner Only Command!*
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.ADMIN_EVENTS = "true";
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ✅ Admin event notifications are now *ENABLED*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    } else if (status === "off") {
        config.ADMIN_EVENTS = "false";
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Admin event notifications are now *DISABLED*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    } else {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* 📝 *Example:* .admin-events on
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }
});

cmd({
    pattern: "welcome",
    alias: ["welcomeset"],
    desc: "Enable or disable welcome messages for new members",
    category: "settings",
    filename: __filename
},
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* ⚙️ *SETTINGS*
*│*
*│* 📛 *Owner Only Command!*
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.WELCOME = "true";
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ✅ Welcome messages are now *ENABLED*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    } else if (status === "off") {
        config.WELCOME = "false";
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Welcome messages are now *DISABLED*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    } else {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* 📝 *Example:* .welcome on
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }
});

cmd({
    pattern: "setprefix",
    alias: ["prefix"],
    react: "🔧",
    desc: "Change the bot's command prefix.",
    category: "settings",
    filename: __filename,
}, async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* ⚙️ *SETTINGS*
*│*
*│* 📛 *Owner Only Command!*
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }

    const newPrefix = args[0];
    if (!newPrefix) {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* 📝 *Example:* .setprefix !
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }

    config.PREFIX = newPrefix;
    return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ✅ Prefix changed to: *${newPrefix}*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
    );
});

cmd({
    pattern: "mode",
    alias: ["setmode"],
    react: "🫟",
    desc: "Set bot mode to private or public.",
    category: "settings",
    filename: __filename,
}, async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* ⚙️ *SETTINGS*
*│*
*│* 📛 *Owner Only Command!*
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }

    if (!args[0]) {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* 📌 Current mode: *${config.MODE}*
*│*
*│* 📝 *Usage:* .mode private OR .mode public
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }

    const modeArg = args[0].toLowerCase();
    if (modeArg === "private") {
        config.MODE = "private";
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ✅ Bot mode set to *PRIVATE*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    } else if (modeArg === "public") {
        config.MODE = "public";
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ✅ Bot mode set to *PUBLIC*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    } else {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Invalid mode. Use *.mode private* or *.mode public*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }
});

cmd({
    pattern: "auto-typing",
    description: "Enable or disable auto-typing feature.",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* ⚙️ *SETTINGS*
*│*
*│* 📛 *Owner Only Command!*
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }

    const status = args[0]?.toLowerCase();
    if (!["on", "off"].includes(status)) {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* 📝 *Example:* .auto-typing on
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }

    config.AUTO_TYPING = status === "on" ? "true" : "false";
    return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ✅ Auto typing has been turned *${status.toUpperCase()}*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
    );
});

cmd({
    pattern: "mention-reply",
    alias: ["menetionreply", "mee"],
    description: "Enable or disable mention reply feature.",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* ⚙️ *SETTINGS*
*│*
*│* 📛 *Owner Only Command!*
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }

    if (args[0] === "on") {
        config.MENTION_REPLY = "true";
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ✅ Mention Reply is now *ENABLED*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    } else if (args[0] === "off") {
        config.MENTION_REPLY = "false";
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Mention Reply is now *DISABLED*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    } else {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* 📝 *Example:* .mee on
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }
});

cmd({
    pattern: "always-online",
    alias: ["alwaysonline"],
    desc: "Enable or disable the always online mode",
    category: "settings",
    filename: __filename
},
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* ⚙️ *SETTINGS*
*│*
*│* 📛 *Owner Only Command!*
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.ALWAYS_ONLINE = "true";
        await reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ✅ Always online mode is now *ENABLED*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    } else if (status === "off") {
        config.ALWAYS_ONLINE = "false";
        await reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Always online mode is now *DISABLED*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    } else {
        await reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* 📝 *Example:* .always-online on
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }
});

cmd({
    pattern: "auto-recording",
    alias: ["autorecoding"],
    description: "Enable or disable auto-recording feature.",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* ⚙️ *SETTINGS*
*│*
*│* 📛 *Owner Only Command!*
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }

    const status = args[0]?.toLowerCase();
    if (!["on", "off"].includes(status)) {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* 📝 *Example:* .auto-recording on
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }

    config.AUTO_RECORDING = status === "on" ? "true" : "false";
    if (status === "on") {
        await conn.sendPresenceUpdate("recording", from);
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ✅ Auto recording is now *ENABLED*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    } else {
        await conn.sendPresenceUpdate("available", from);
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Auto recording is now *DISABLED*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }
});

cmd({
    pattern: "auto-seen",
    alias: ["autostatusview"],
    desc: "Enable or disable auto-viewing of statuses",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* ⚙️ *SETTINGS*
*│*
*│* 📛 *Owner Only Command!*
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }

    if (args[0] === "on") {
        config.AUTO_STATUS_SEEN = "true";
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ✅ Auto status seen is now *ENABLED*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    } else if (args[0] === "off") {
        config.AUTO_STATUS_SEEN = "false";
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Auto status seen is now *DISABLED*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    } else {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* 📝 *Example:* .auto-seen on
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }
});

cmd({
    pattern: "status-react",
    alias: ["statusreaction"],
    desc: "Enable or disable auto-liking of statuses",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* ⚙️ *SETTINGS*
*│*
*│* 📛 *Owner Only Command!*
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }

    if (args[0] === "on") {
        config.AUTO_STATUS_REACT = "true";
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ✅ Auto status react is now *ENABLED*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    } else if (args[0] === "off") {
        config.AUTO_STATUS_REACT = "false";
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Auto status react is now *DISABLED*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    } else {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* 📝 *Example:* .status-react on
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }
});

cmd({
    pattern: "read-message",
    alias: ["autoread"],
    desc: "enable or disable readmessage.",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* ⚙️ *SETTINGS*
*│*
*│* 📛 *Owner Only Command!*
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }

    if (args[0] === "on") {
        config.READ_MESSAGE = "true";
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ✅ Read message is now *ENABLED*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    } else if (args[0] === "off") {
        config.READ_MESSAGE = "false";
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Read message is now *DISABLED*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    } else {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* 📝 *Example:* .read-message on
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }
});

cmd({
    pattern: "anti-bad",
    alias: ["antibadword"],
    desc: "enable or disable antibad.",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* ⚙️ *SETTINGS*
*│*
*│* 📛 *Owner Only Command!*
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }

    if (args[0] === "on") {
        config.ANTI_BAD_WORD = "true";
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ✅ Anti bad word is now *ENABLED*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    } else if (args[0] === "off") {
        config.ANTI_BAD_WORD = "false";
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Anti bad word is now *DISABLED*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    } else {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* 📝 *Example:* .anti-bad on
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }
});

cmd({
    pattern: "auto-sticker",
    alias: ["autosticker"],
    desc: "enable or disable auto-sticker.",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* ⚙️ *SETTINGS*
*│*
*│* 📛 *Owner Only Command!*
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }

    if (args[0] === "on") {
        config.AUTO_STICKER = "true";
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ✅ Auto sticker is now *ENABLED*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    } else if (args[0] === "off") {
        config.AUTO_STICKER = "false";
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Auto sticker is now *DISABLED*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    } else {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* 📝 *Example:* .auto-sticker on
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }
});

cmd({
    pattern: "auto-reply",
    alias: ["autoreply"],
    desc: "enable or disable auto-reply.",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* ⚙️ *SETTINGS*
*│*
*│* 📛 *Owner Only Command!*
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }

    if (args[0] === "on") {
        config.AUTO_REPLY = "true";
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ✅ Auto reply is now *ENABLED*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    } else if (args[0] === "off") {
        config.AUTO_REPLY = "false";
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Auto reply is now *DISABLED*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    } else {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* 📝 *Example:* .auto-reply on
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }
});

cmd({
    pattern: "auto-react",
    alias: ["autoreact"],
    desc: "Enable or disable the autoreact feature",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* ⚙️ *SETTINGS*
*│*
*│* 📛 *Owner Only Command!*
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }

    if (args[0] === "on") {
        config.AUTO_REACT = "true";
        await reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ✅ Auto react is now *ENABLED*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    } else if (args[0] === "off") {
        config.AUTO_REACT = "false";
        await reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Auto react is now *DISABLED*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    } else {
        await reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* 📝 *Example:* .auto-react on
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }
});

cmd({
    pattern: "status-reply",
    alias: ["autostatusreply"],
    desc: "enable or disable status-reply.",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* ⚙️ *SETTINGS*
*│*
*│* 📛 *Owner Only Command!*
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }

    if (args[0] === "on") {
        config.AUTO_STATUS_REPLY = "true";
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ✅ Status reply is now *ENABLED*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    } else if (args[0] === "off") {
        config.AUTO_STATUS_REPLY = "false";
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Status reply is now *DISABLED*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    } else {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* 📝 *Example:* .status-reply on
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }
});

cmd({
  pattern: "antilink",
  alias: ["antilinks"],
  desc: "Enable or disable ANTI_LINK in groups",
  category: "group",
  react: "🚫",
  filename: __filename
}, async (conn, mek, m, { isGroup, isAdmins, isBotAdmins, args, reply }) => {
  try {
    if (!isGroup) {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ This command can only be used in a group!
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }
    if (!isBotAdmins) {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Bot must be an admin to use this command!
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }
    if (!isAdmins) {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ You must be an admin to use this command!
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }

    if (args[0] === "on") {
      config.ANTI_LINK = "true";
      reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ✅ ANTI_LINK has been *ENABLED*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    } else if (args[0] === "off") {
      config.ANTI_LINK = "false";
      reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ ANTI_LINK has been *DISABLED*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    } else {
      reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* 📝 *Usage:* .antilink on/off
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }
  } catch (e) {
    reply(`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❌ Error: ${e.message}\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`);
  }
});

cmd({
  pattern: "antilinkkick",
  alias: ["kicklink"],
  desc: "Enable or disable ANTI_LINK_KICK in groups",
  category: "group",
  react: "⚠️",
  filename: __filename
}, async (conn, mek, m, { isGroup, isAdmins, isBotAdmins, args, reply }) => {
  try {
    if (!isGroup) {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ This command can only be used in a group!
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }
    if (!isBotAdmins) {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Bot must be an admin to use this command!
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }
    if (!isAdmins) {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ You must be an admin to use this command!
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }

    if (args[0] === "on") {
      config.ANTI_LINK_KICK = "true";
      reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ✅ ANTI_LINK_KICK has been *ENABLED*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    } else if (args[0] === "off") {
      config.ANTI_LINK_KICK = "false";
      reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ ANTI_LINK_KICK has been *DISABLED*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    } else {
      reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* 📝 *Usage:* .antilinkkick on/off
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }
  } catch (e) {
    reply(`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❌ Error: ${e.message}\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`);
  }
});

cmd({
  pattern: "deletelink",
  alias: ["linksdelete"],
  desc: "Enable or disable DELETE_LINKS in groups",
  category: "group",
  react: "❌",
  filename: __filename
}, async (conn, mek, m, { isGroup, isAdmins, isBotAdmins, args, reply }) => {
  try {
    if (!isGroup) {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ This command can only be used in a group!
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }
    if (!isBotAdmins) {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ Bot must be an admin to use this command!
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }
    if (!isAdmins) {
        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ You must be an admin to use this command!
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }

    if (args[0] === "on") {
      config.DELETE_LINKS = "true";
      reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ✅ DELETE_LINKS is now *ENABLED*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    } else if (args[0] === "off") {
      config.DELETE_LINKS = "false";
      reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* ❌ DELETE_LINKS is now *DISABLED*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    } else {
      reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│* 📝 *Usage:* .deletelink on/off
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }
  } catch (e) {
    reply(`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*\n*│* ❌ Error: ${e.message}\n*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`);
  }
});