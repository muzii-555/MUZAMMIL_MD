const { cmd } = require('../command');

const stylizedChars = {
    a: '🅐', b: '🅑', c: '🅒', d: '🅓', e: '🅔', f: '🅕', g: '🅖',
    h: '🅗', i: '🅘', j: '🅙', k: '🅚', l: '🅛', m: '🅜', n: '🅝',
    o: '🅞', p: '🅟', q: '🅠', r: '🅡', s: '🅢', t: '🅣', u: '🅤',
    v: '🅥', w: '🅦', x: '🅧', y: '🅨', z: '🅩',
    '0': '⓿', '1': '➊', '2': '➋', '3': '➌', '4': '➍',
    '5': '➎', '6': '➏', '7': '➐', '8': '➑', '9': '➒'
};

cmd({
    pattern: "chr",
    alias: ["creact"],
    react: "🔤",
    desc: "React to channel messages with stylized text",
    category: "owner",
    use: ".chr <channel-link> <text>",
    filename: __filename
},
async (conn, mek, m, { q, command, isCreator, reply }) => {
    try {
        if (!isCreator) return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ ❌ OWNER ONLY COMMAND*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );

        if (!q) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ ❌ USAGE:*
*┇▸ ${command} <link> <text>*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ 💡 EXAMPLE:*
*┇▸ ${command} https://whatsapp.com/channel/xxxxx/yyyy hello*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        const [link, ...textParts] = q.split(' ');
        if (!link.includes("whatsapp.com/channel/")) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ ❌ INVALID CHANNEL LINK*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        const inputText = textParts.join(' ').toLowerCase();
        if (!inputText) return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ ❌ TEXT MISSING*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );

        const emoji = inputText
            .split('')
            .map(c => c === ' ' ? '―' : stylizedChars[c] || c)
            .join('');

        const channelId = link.split('/')[4];
        const messageId = link.split('/')[5];
        if (!channelId || !messageId) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ ❌ INVALID CHANNEL MESSAGE LINK*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        const channelMeta = await conn.newsletterMetadata("invite", channelId);
        await conn.newsletterReactMessage(channelMeta.id, messageId, emoji);

        return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ ✅ REACTION SENT SUCCESSFULLY*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ 📢 CHANNEL:*
*┇▸ ${channelMeta.name}*
*┇▸*
*┇▸ 🔤 REACTION:*
*┇▸ ${emoji}*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ 🤖 MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    } catch (e) {
        console.error(e);
        reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ ❌ REACTION FAILED*
*┇▸ 🔄 TRY AGAIN LATER*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*┇▸ 🤖 MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }
});