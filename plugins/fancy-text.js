const { cmd } = require("../command");

cmd({
  pattern: "fancy",
  alias: ["font", "style", "fonts"],
  react: "✍️",
  desc: "Generate 25+ fancy text styles for your text",
  category: "tools",
  use: ".fancy <text>",
  filename: __filename
}, async (conn, m, store, { from, quoted, args, q, reply }) => {
  try {
    if (!q) {
      return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* ✍️ *Fancy Text Generator*
*│*
*│* ❌ Please provide text!
*│*
*│* 📝 *Example:* .fancy Hello
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
      );
    }

    await conn.sendMessage(from, { react: { text: "✍️", key: m.key } });

    const t = q;

    function convert(map, text) {
      return text.split("").map(c => map[c] || map[c.toLowerCase()] || c).join("");
    }

    const fonts = [];

    // 1 - 𝓒𝓾𝓻𝓼𝓲𝓿𝓮 (Script)
    const cursive = {
      a:"𝓪", b:"𝓫", c:"𝓬", d:"𝓭", e:"𝓮", f:"𝓯", g:"𝓰",
      h:"𝓱", i:"𝓲", j:"𝓳", k:"𝓴", l:"𝓵", m:"𝓶", n:"𝓷",
      o:"𝓸", p:"𝓹", q:"𝓺", r:"𝓻", s:"𝓼", t:"𝓽", u:"𝓾",
      v:"𝓿", w:"𝔀", x:"𝔁", y:"𝔂", z:"𝔃",
      A:"𝓐", B:"𝓑", C:"𝓒", D:"𝓓", E:"𝓔", F:"𝓕", G:"𝓖",
      H:"𝓗", I:"𝓘", J:"𝓙", K:"𝓚", L:"𝓛", M:"𝓜", N:"𝓝",
      O:"𝓞", P:"𝓟", Q:"𝓠", R:"𝓡", S:"𝓢", T:"𝓣", U:"𝓤",
      V:"𝓥", W:"𝓦", X:"𝓧", Y:"𝓨", Z:"𝓩"
    }; fonts.push({name:"𝓒𝓾𝓻𝓼𝓲𝓿𝓮", result:convert(cursive,t)});

    // 2 - 𝔻𝕠𝕦𝕓𝕝𝕖 (Double Struck)
    const double = {
      a:"𝕒", b:"𝕓", c:"𝕔", d:"𝕕", e:"𝕖", f:"𝕗", g:"𝕘",
      h:"𝕙", i:"𝕚", j:"𝕛", k:"𝕜", l:"𝕝", m:"𝕞", n:"𝕟",
      o:"𝕠", p:"𝕡", q:"𝕢", r:"𝕣", s:"𝕤", t:"𝕥", u:"𝕦",
      v:"𝕧", w:"𝕨", x:"𝕩", y:"𝕪", z:"𝕫",
      A:"𝔸", B:"𝔹", C:"ℂ", D:"𝔻", E:"𝔼", F:"𝔽", G:"𝔾",
      H:"ℍ", I:"𝕀", J:"𝕁", K:"𝕂", L:"𝕃", M:"𝕄", N:"ℕ",
      O:"𝕆", P:"ℙ", Q:"ℚ", R:"ℝ", S:"𝕊", T:"𝕋", U:"𝕌",
      V:"𝕍", W:"𝕎", X:"𝕏", Y:"𝕐", Z:"ℤ"
    }; fonts.push({name:"𝔻𝕠𝕦𝕓𝕝𝕖", result:convert(double,t)});

    // 3 - 𝐁𝐨𝐥𝐝 (Bold Serif)
    const bold = {
      a:"𝐚",b:"𝐛",c:"𝐜",d:"𝐝",e:"𝐞",f:"𝐟",g:"𝐠",
      h:"𝐡",i:"𝐢",j:"𝐣",k:"𝐤",l:"𝐥",m:"𝐦",n:"𝐧",
      o:"𝐨",p:"𝐩",q:"𝐪",r:"𝐫",s:"𝐬",t:"𝐭",u:"𝐮",
      v:"𝐯",w:"𝐰",x:"𝐱",y:"𝐲",z:"𝐳",
      A:"𝐀",B:"𝐁",C:"𝐂",D:"𝐃",E:"𝐄",F:"𝐅",G:"𝐆",
      H:"𝐇",I:"𝐈",J:"𝐉",K:"𝐊",L:"𝐋",M:"𝐌",N:"𝐍",
      O:"𝐎",P:"𝐏",Q:"𝐐",R:"𝐑",S:"𝐒",T:"𝐓",U:"𝐔",
      V:"𝐕",W:"𝐖",X:"𝐗",Y:"𝐘",Z:"𝐙"
    }; fonts.push({name:"𝐁𝐨𝐥𝐝", result:convert(bold,t)});

    // 4 - 𝕱𝖗𝖆𝖐𝖙𝖚𝖗 (Gothic/Fraktur)
    const fraktur = {
      a:"𝖆",b:"𝖇",c:"𝖈",d:"𝖉",e:"𝖊",f:"𝖋",g:"𝖌",
      h:"𝖍",i:"𝖎",j:"𝖏",k:"𝖐",l:"𝖑",m:"𝖒",n:"𝖓",
      o:"𝖔",p:"𝖕",q:"𝖖",r:"𝖗",s:"𝖘",t:"𝖙",u:"𝖚",
      v:"𝖛",w:"𝖜",x:"𝖝",y:"𝖞",z:"𝖟",
      A:"𝕬",B:"𝕭",C:"𝕮",D:"𝕯",E:"𝕰",F:"𝕱",G:"𝕲",
      H:"𝕳",I:"𝕴",J:"𝕵",K:"𝕶",L:"𝕷",M:"𝕸",N:"𝕹",
      O:"𝕺",P:"𝕻",Q:"𝕼",R:"𝕽",S:"𝕾",T:"𝕿",U:"𝖀",
      V:"𝖁",W:"𝖂",X:"𝖃",Y:"𝖄",Z:"𝖅"
    }; fonts.push({name:"𝕱𝖗𝖆𝖐𝖙𝖚𝖗", result:convert(fraktur,t)});

    // 5 - Sᴍᴀʟʟ Cᴀᴘs
    const smallCaps = {
      a:"ᴀ",b:"ʙ",c:"ᴄ",d:"ᴅ",e:"ᴇ",f:"ꜰ",g:"ɢ",
      h:"ʜ",i:"ɪ",j:"ᴊ",k:"ᴋ",l:"ʟ",m:"ᴍ",n:"ɴ",
      o:"ᴏ",p:"ᴘ",q:"ǫ",r:"ʀ",s:"s",t:"ᴛ",u:"ᴜ",
      v:"ᴠ",w:"ᴡ",x:"x",y:"ʏ",z:"ᴢ",
      A:"A",B:"B",C:"C",D:"D",E:"E",F:"F",G:"G",
      H:"H",I:"I",J:"J",K:"K",L:"L",M:"M",N:"N",
      O:"O",P:"P",Q:"Q",R:"R",S:"S",T:"T",U:"U",
      V:"V",W:"W",X:"X",Y:"Y",Z:"Z"
    }; fonts.push({name:"Sᴍᴀʟʟ Cᴀᴘs", result:convert(smallCaps,t)});

    // 6 - ᵀⁱⁿʸ (Superscript)
    const tiny = {
      a:"ᵃ",b:"ᵇ",c:"ᶜ",d:"ᵈ",e:"ᵉ",f:"ᶠ",g:"ᵍ",
      h:"ʰ",i:"ⁱ",j:"ʲ",k:"ᵏ",l:"ˡ",m:"ᵐ",n:"ⁿ",
      o:"ᵒ",p:"ᵖ",q:"ᑫ",r:"ʳ",s:"ˢ",t:"ᵗ",u:"ᵘ",
      v:"ᵛ",w:"ʷ",x:"ˣ",y:"ʸ",z:"ᶻ",
      A:"ᴬ",B:"ᴮ",C:"ᶜ",D:"ᴰ",E:"ᴱ",F:"ᶠ",G:"ᴳ",
      H:"ᴴ",I:"ᴵ",J:"ᴶ",K:"ᴷ",L:"ᴸ",M:"ᴹ",N:"ᴺ",
      O:"ᴼ",P:"ᴾ",Q:"Q",R:"ᴿ",S:"ˢ",T:"ᵀ",U:"ᵁ",
      V:"ⱽ",W:"ᵂ",X:"ˣ",Y:"ʸ",Z:"ᶻ"
    }; fonts.push({name:"ᵀⁱⁿʸ", result:convert(tiny,t)});

    // 7 - Ⓑⓤⓑⓑⓛⓔ
    const bubble = {
      a:"ⓐ",b:"ⓑ",c:"ⓒ",d:"ⓓ",e:"ⓔ",f:"ⓕ",g:"ⓖ",
      h:"ⓗ",i:"ⓘ",j:"ⓙ",k:"ⓚ",l:"ⓛ",m:"ⓜ",n:"ⓝ",
      o:"ⓞ",p:"ⓟ",q:"ⓠ",r:"ⓡ",s:"ⓢ",t:"ⓣ",u:"ⓤ",
      v:"ⓥ",w:"ⓦ",x:"ⓧ",y:"ⓨ",z:"ⓩ",
      A:"Ⓐ",B:"Ⓑ",C:"Ⓒ",D:"Ⓓ",E:"Ⓔ",F:"Ⓕ",G:"Ⓖ",
      H:"Ⓗ",I:"Ⓘ",J:"Ⓙ",K:"Ⓚ",L:"Ⓛ",M:"Ⓜ",N:"Ⓝ",
      O:"Ⓞ",P:"Ⓟ",Q:"Ⓠ",R:"Ⓡ",S:"Ⓢ",T:"Ⓣ",U:"Ⓤ",
      V:"Ⓥ",W:"Ⓦ",X:"Ⓧ",Y:"Ⓨ",Z:"Ⓩ"
    }; fonts.push({name:"Ⓑⓤⓑⓑⓛⓔ", result:convert(bubble,t)});

    // 8 - 🅂🅀🅄🄰🅁🄴
    const square = {
      a:"🅰",b:"🅱",c:"🅲",d:"🅳",e:"🅴",f:"🅵",g:"🅶",
      h:"🅷",i:"🅸",j:"🅹",k:"🅺",l:"🅻",m:"🅼",n:"🅽",
      o:"🅾",p:"🅿",q:"🆀",r:"🆁",s:"🆂",t:"🆃",u:"🆄",
      v:"🆅",w:"🆆",x:"🆇",y:"🆈",z:"🆉",
      A:"🅰",B:"🅱",C:"🅲",D:"🅳",E:"🅴",F:"🅵",G:"🅶",
      H:"🅷",I:"🅸",J:"🅹",K:"🅺",L:"🅻",M:"🅼",N:"🅽",
      O:"🅾",P:"🅿",Q:"🆀",R:"🆁",S:"🆂",T:"🆃",U:"🆄",
      V:"🆅",W:"🆆",X:"🆇",Y:"🆈",Z:"🆉"
    }; fonts.push({name:"🅂🅀🅄🄰🅁🄴", result:convert(square,t)});

    // 9 - M̷o̷n̷o̷s̷p̷a̷c̷e̷ (Strikethrough)
    const strike = {
      a:"a̶",b:"b̶",c:"c̶",d:"d̶",e:"e̶",f:"f̶",g:"g̶",
      h:"h̶",i:"i̶",j:"j̶",k:"k̶",l:"l̶",m:"m̶",n:"n̶",
      o:"o̶",p:"p̶",q:"q̶",r:"r̶",s:"s̶",t:"t̶",u:"u̶",
      v:"v̶",w:"w̶",x:"x̶",y:"y̶",z:"z̶",
      A:"A̶",B:"B̶",C:"C̶",D:"D̶",E:"E̶",F:"F̶",G:"G̶",
      H:"H̶",I:"I̶",J:"J̶",K:"K̶",L:"L̶",M:"M̶",N:"N̶",
      O:"O̶",P:"P̶",Q:"Q̶",R:"R̶",S:"S̶",T:"T̶",U:"U̶",
      V:"V̶",W:"W̶",X:"X̶",Y:"Y̶",Z:"Z̶"
    }; fonts.push({name:"S̷t̷r̷i̷k̷e̷", result:convert(strike,t)});

    // 10 - uʍop ǝpᴉsdn (Upside Down)
    const upside = {
      a:"ɐ",b:"q",c:"ɔ",d:"p",e:"ǝ",f:"ɟ",g:"ƃ",h:"ɥ",
      i:"ᴉ",j:"ɾ",k:"ʞ",l:"l",m:"ɯ",n:"u",o:"o",p:"d",
      q:"b",r:"ɹ",s:"s",t:"ʇ",u:"n",v:"ʌ",w:"ʍ",x:"x",
      y:"ʎ",z:"z",
      A:"∀",B:"𐐒",C:"Ɔ",D:"ᗡ",E:"Ǝ",F:"Ⅎ",G:"⅁",H:"H",
      I:"I",J:"ſ",K:"⋊",L:"⅂",M:"W",N:"N",O:"O",P:"Ԁ",
      Q:"Ό",R:"ᴚ",S:"S",T:"⊥",U:"∩",V:"Λ",W:"M",X:"X",
      Y:"⅄",Z:"Z"
    }; fonts.push({name:"uʍop ǝpᴉsdn", result:convert(upside,t).split("").reverse().join("")});

    // 11 - 𝗦𝗮𝗻𝘀 (Sans Serif Bold)
    const sans = {
      a:"𝗮",b:"𝗯",c:"𝗰",d:"𝗱",e:"𝗲",f:"𝗳",g:"𝗴",
      h:"𝗵",i:"𝗶",j:"𝗷",k:"𝗸",l:"𝗹",m:"𝗺",n:"𝗻",
      o:"𝗼",p:"𝗽",q:"𝗾",r:"𝗿",s:"𝘀",t:"𝘁",u:"𝘂",
      v:"𝘃",w:"𝘄",x:"𝘅",y:"𝘆",z:"𝘇",
      A:"𝗔",B:"𝗕",C:"𝗖",D:"𝗗",E:"𝗘",F:"𝗙",G:"𝗚",
      H:"𝗛",I:"𝗜",J:"𝗝",K:"𝗞",L:"𝗟",M:"𝗠",N:"𝗡",
      O:"𝗢",P:"𝗣",Q:"𝗤",R:"𝗥",S:"𝗦",T:"𝗧",U:"𝗨",
      V:"𝗩",W:"𝗪",X:"𝗫",Y:"𝗬",Z:"𝗭"
    }; fonts.push({name:"𝗦𝗮𝗻𝘀 𝗕𝗼𝗹𝗱", result:convert(sans,t)});

    // 12 - 𝘐𝘵𝘢𝘭𝘪𝘤
    const italic = {
      a:"𝘢",b:"𝘣",c:"𝘤",d:"𝘥",e:"𝘦",f:"𝘧",g:"𝘨",
      h:"𝘩",i:"𝘪",j:"𝘫",k:"𝘬",l:"𝘭",m:"𝘮",n:"𝘯",
      o:"𝘰",p:"𝘱",q:"𝘲",r:"𝘳",s:"𝘴",t:"𝘵",u:"𝘶",
      v:"𝘷",w:"𝘸",x:"𝘹",y:"𝘺",z:"𝘻",
      A:"𝘈",B:"𝘉",C:"𝘊",D:"𝘋",E:"𝘌",F:"𝘍",G:"𝘎",
      H:"𝘏",I:"𝘐",J:"𝘑",K:"𝘒",L:"𝘓",M:"𝘔",N:"𝘕",
      O:"𝘖",P:"𝘗",Q:"𝘘",R:"𝘙",S:"𝘚",T:"𝘛",U:"𝘜",
      V:"𝘝",W:"𝘞",X:"𝘟",Y:"𝘠",Z:"𝘡"
    }; fonts.push({name:"𝘐𝘵𝘢𝘭𝘪𝘤", result:convert(italic,t)});

    // 13 - 𝙼𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎
    const mono = {
      a:"𝚊",b:"𝚋",c:"𝚌",d:"𝚍",e:"𝚎",f:"𝚏",g:"𝚐",
      h:"𝚑",i:"𝚒",j:"𝚓",k:"𝚔",l:"𝚕",m:"𝚖",n:"𝚗",
      o:"𝚘",p:"𝚙",q:"𝚚",r:"𝚛",s:"𝚜",t:"𝚝",u:"𝚞",
      v:"𝚟",w:"𝚠",x:"𝚡",y:"𝚢",z:"𝚣",
      A:"𝙰",B:"𝙱",C:"𝙲",D:"𝙳",E:"𝙴",F:"𝙵",G:"𝙶",
      H:"𝙷",I:"𝙸",J:"𝙹",K:"𝙺",L:"𝙻",M:"𝙼",N:"𝙽",
      O:"𝙾",P:"𝙿",Q:"𝚀",R:"𝚁",S:"𝚂",T:"𝚃",U:"𝚄",
      V:"𝚅",W:"𝚆",X:"𝚇",Y:"𝚈",Z:"𝚉"
    }; fonts.push({name:"𝙼𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎", result:convert(mono,t)});

    // 14 - 🄵🄻🄸🄿 (Flipped)
    fonts.push({name:"🄵🄻🄸🄿", result:t.split("").reverse().join("")});

    // 15 - 【Brackets】
    fonts.push({name:"【Brackets】", result:`【 ${t} 】`});

    // 16 - 『Decorated』
    fonts.push({name:"『Decorated』", result:`『 ${t} 』`});

    // 17 - 「Quoted」
    fonts.push({name:"「Quoted」", result:`「 ${t} 」`});

    // 18 - ˢᵖᵃᶜᵉᵈ (Spaced)
    fonts.push({name:"ˢᵖᵃᶜᵉᵈ", result:t.split("").join(" ")});

    // 19 - D͇o͇t͇t͇e͇d͇ (Underdot)
    const underdot = {
      a:"ạ",b:"ḅ",c:"c̣",d:"ḍ",e:"ẹ",f:"f̣",g:"g̣",
      h:"ḥ",i:"ị",j:"j̣",k:"ḳ",l:"ḷ",m:"ṃ",n:"ṇ",
      o:"ọ",p:"p̣",q:"q̣",r:"ṛ",s:"ṣ",t:"ṭ",u:"ụ",
      v:"ṿ",w:"ẉ",x:"x̣",y:"ỵ",z:"ẓ",
      A:"Ạ",B:"Ḅ",C:"C̣",D:"Ḍ",E:"Ẹ",F:"F̣",G:"G̣",
      H:"Ḥ",I:"Ị",J:"J̣",K:"Ḳ",L:"Ḷ",M:"Ṃ",N:"Ṇ",
      O:"Ọ",P:"P̣",Q:"Q̣",R:"Ṛ",S:"Ṣ",T:"Ṭ",U:"Ụ",
      V:"Ṿ",W:"Ẉ",X:"X̣",Y:"Ỵ",Z:"Ẓ"
    }; fonts.push({name:"D͇o͇t͇t͇e͇d͇", result:convert(underdot,t)});

    // 20 - C̳i̳r̳c̳l̳e̳d̳
    const circled = {
      a:"a⃝",b:"b⃝",c:"c⃝",d:"d⃝",e:"e⃝",f:"f⃝",g:"g⃝",
      h:"h⃝",i:"i⃝",j:"j⃝",k:"k⃝",l:"l⃝",m:"m⃝",n:"n⃝",
      o:"o⃝",p:"p⃝",q:"q⃝",r:"r⃝",s:"s⃝",t:"t⃝",u:"u⃝",
      v:"v⃝",w:"w⃝",x:"x⃝",y:"y⃝",z:"z⃝",
      A:"A⃝",B:"B⃝",C:"C⃝",D:"D⃝",E:"E⃝",F:"F⃝",G:"G⃝",
      H:"H⃝",I:"I⃝",J:"J⃝",K:"K⃝",L:"L⃝",M:"M⃝",N:"N⃝",
      O:"O⃝",P:"P⃝",Q:"Q⃝",R:"R⃝",S:"S⃝",T:"T⃝",U:"U⃝",
      V:"V⃝",W:"W⃝",X:"X⃝",Y:"Y⃝",Z:"Z⃝"
    }; fonts.push({name:"C⃝i⃝r⃝c⃝l⃝e⃝d⃝", result:convert(circled,t)});

    // 21 - GL∆ITCH (Mixed Symbols)
    const glitch = {
      a:"∆",b:"8",c:"<",d:"|)",e:"3",f:"ƒ",g:"9",
      h:"#",i:"!",j:"_|",k:"|<",l:"|_",m:"/V\\",
      n:"|\\|",o:"0",p:"|>",q:"(,)",r:"|2",s:"5",
      t:"7",u:"µ",v:"\\/",w:"\\/\\/",x:"><",y:"¥",z:"2",
      A:"∆",B:"8",C:"<",D:"|)",E:"3",F:"ƒ",G:"9",
      H:"#",I:"!",J:"_|",K:"|<",L:"|_",M:"/V\\",
      N:"|\\|",O:"0",P:"|>",Q:"(,)",R:"|2",S:"5",
      T:"7",U:"µ",V:"\\/",W:"\\/\\/",X:"><",Y:"¥",Z:"2"
    }; fonts.push({name:"GL∆ITCH", result:convert(glitch,t)});

    // 22 - ʟᴏᴡᴇʀᴄᴀsᴇ
    fonts.push({name:"ʟᴏᴡᴇʀᴄᴀsᴇ", result:t.toLowerCase()});

    // 23 - UPPERCASE
    fonts.push({name:"UPPERCASE", result:t.toUpperCase()});

    // 24 - 🅁🄰🄽🄳🄾🄼 🄲🄰🅂🄴
    const randomCase = t.split("").map((c, i) => i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()).join("");
    fonts.push({name:"🅁🄰🄽🄳🄾🄼 🄲🄰🅂🄴", result:randomCase});

    // 25 - ░S░p░a░c░e░d░ (Block Spaced)
    fonts.push({name:"░S░p░a░c░e░d░", result:"░" + t.split("").join("░") + "░"});

    // 26 - M̳o̳r̳s̳e̳ (Morse Code)
    const morse = {
      a:".-",b:"-...",c:"-.-.",d:"-..",e:".",f:"..-.",
      g:"--.",h:"....",i:"..",j:".---",k:"-.-",l:".-..",
      m:"--",n:"-.",o:"---",p:".--.",q:"--.-",r:".-.",
      s:"...",t:"-",u:"..-",v:"...-",w:".--",x:"-..-",
      y:"-.--",z:"--..", " ":"/",
      A:".-",B:"-...",C:"-.-.",D:"-..",E:".",F:"..-.",
      G:"--.",H:"....",I:"..",J:".---",K:"-.-",L:".-..",
      M:"--",N:"-.",O:"---",P:".--.",Q:"--.-",R:".-.",
      S:"...",T:"-",U:"..-",V:"...-",W:".--",X:"-..-",
      Y:"-.--",Z:"--.."
    };
    const morseResult = t.split("").map(c => morse[c] || c).join(" ");
    fonts.push({name:"M̳o̳r̳s̳e̳", result:morseResult});

    // Build final message
    let msg = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* ✍️ *FANCY TEXT GENERATOR*
*│* 📝 *Original:* ${t}
*│* 🔢 *Total Fonts:* ${fonts.length}+
*│*
*│* ─── *Generated Styles* ───
*│*\n`;

    fonts.forEach((f, i) => {
      msg += `*│* *${i+1}.* ${f.name}\n*│* ${f.result}\n*│*\n`;
    });

    msg += `*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

    await conn.sendMessage(from, { text: msg }, { quoted: m });
    await conn.sendMessage(from, { react: { text: "✅", key: m.key } });

  } catch (e) {
    console.error("FANCY ERROR:", e);
    reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* ⚠️ *Error occurred*
*│* Please try again later
*│*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
    );
  }
});