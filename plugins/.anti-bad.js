const { cmd } = require('../command');
const config = require("../config");
const fs = require("fs");

const MAX_STRIKES = 3;
const DB_FILE = "./vip_warnings.json";
const OWNER_NUMBER = "923XXXXXXXXX@s.whatsapp.net"; // apna number

let warnings = {};

// Load DB
if (fs.existsSync(DB_FILE)) {
  try {
    warnings = JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
  } catch {
    warnings = {};
  }
}

function saveDB() {
  fs.writeFileSync(DB_FILE, JSON.stringify(warnings, null, 2));
}

const badWords = [
  "fuck","bitch","asshole","bastard",
  "madarchod","behenchod","chutiya",
  "gandu","lund","harami","randi",
  "wtf","xxx","sex"
];

const badWordRegex = new RegExp(badWords.join("|"), "i");

cmd({
  on: "body"
}, async (conn, m, store, { from, isGroup, sender }) => {

  try {

    if (!config.ANTI_BAD_WORD) return;
    if (!isGroup) return;
    if (!m.text) return;

    const metadata = await conn.groupMetadata(from);
    const admins = metadata.participants
      .filter(p => p.admin)
      .map(p => p.id);

    const isAdmins = admins.includes(sender);
    const isBotAdmins = admins.includes(conn.user.id);

    if (!isBotAdmins) return;
    if (isAdmins) return;
    if (sender === OWNER_NUMBER) return;

    if (!badWordRegex.test(m.text)) return;

    // Delete Message
    await conn.sendMessage(from, {
      delete: m.key
    });

    if (!warnings[sender]) warnings[sender] = 0;
    warnings[sender]++;

    saveDB();

    let count = warnings[sender];

    if (count >= MAX_STRIKES) {

      await conn.sendMessage(from, {
        text: `⛔ @${sender.split("@")[0]} removed for abusive language.`,
        mentions: [sender]
      });

      await conn.groupParticipantsUpdate(from, [sender], "remove");

      delete warnings[sender];
      saveDB();
      return;
    }

    await conn.sendMessage(from, {
      text: `⚠ Warning ${count}/3 @${sender.split("@")[0]}`,
      mentions: [sender]
    });

  } catch (err) {
    console.log("ERROR:", err);
  }
});
