const { cmd } = require('../command');
const config = require("../config");
const fs = require("fs");

const MAX_STRIKES = 3;
const DB_FILE = "./vip_warnings.json";
const OWNER_NUMBER = "923XXXXXXXXX@s.whatsapp.net"; // apna number dalna

// ================= LOAD DATABASE SAFELY =================
let warnings = {};
try {
  if (fs.existsSync(DB_FILE)) {
    const data = fs.readFileSync(DB_FILE, "utf8");
    warnings = JSON.parse(data || "{}");
  }
} catch (err) {
  console.log("DB Load Error, resetting...");
  warnings = {};
}

function saveDB() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(warnings, null, 2));
  } catch (err) {
    console.log("DB Save Error:", err);
  }
}

// ================= BAD WORD LIST =================
const badWords = [
  "fuck","bitch","asshole","bastard",
  "madarchod","behenchod","chutiya",
  "gandu","lund","harami","randi",
  "wtf","xxx","sex"
];

// Escape regex safe
function escapeRegex(word) {
  return word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Smart spaced detection (f.u.c.k / f u c k)
const badWordRegex = new RegExp(
  badWords
    .map(w => escapeRegex(w).split("").join("\\W*"))
    .join("|"),
  "i"
);

// ================= MAIN HANDLER =================
cmd({
  on: "body"
}, async (conn, m, store, {
  from,
  body,
  isGroup,
  isAdmins,
  isBotAdmins,
  sender
}) => {
  try {

    // Proper config check
    if (!config.ANTI_BAD_WORD || config.ANTI_BAD_WORD === "false") return;
    if (!isGroup || !isBotAdmins || !body) return;
    if (sender === OWNER_NUMBER) return;
    if (isAdmins) return;

    if (!badWordRegex.test(body)) return;

    // Delete message
    try {
      await conn.sendMessage(from, { delete: m.key });
    } catch (e) {
      console.log("Delete Failed");
    }

    if (!warnings[sender]) warnings[sender] = 0;
    warnings[sender]++;
    saveDB();

    let count = warnings[sender];
    let username = sender.split("@")[0];

    let warningText = "";

    if (count === 1) {
      warningText = `
╔═══〔 ⚠ VIP WARNING 1 ⚠ 〕═══╗
┃ 👤 @${username}
┃ ❗ Please avoid abusive words
╚══════════════════════╝`;
    }

    else if (count === 2) {
      warningText = `
╔═══〔 ⚠ VIP WARNING 2 ⚠ 〕═══╗
┃ 👤 @${username}
┃ 🚫 Last chance! Control language
╚══════════════════════╝`;
    }

    else if (count >= MAX_STRIKES) {
      warningText = `
╔═══〔 ⛔ FINAL WARNING ⛔ 〕═══╗
┃ 👤 @${username}
┃ ❌ Removed from group
╚══════════════════════╝`;

      await conn.sendMessage(from, {
        text: warningText,
        mentions: [sender]
      });

      await conn.groupParticipantsUpdate(from, [sender], "remove");

      delete warnings[sender];
      saveDB();
      return;
    }

    await conn.sendMessage(from, {
      text: warningText,
      mentions: [sender]
    }, { quoted: m });

  } catch (err) {
    console.error("VIP Warning System Error:", err);
  }
});
