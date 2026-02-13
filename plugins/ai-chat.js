const { cmd } = require('../command');
const axios = require('axios');

// ==================== GPT-4 PREMIUM ====================
cmd({
    pattern: "gpt4",
    alias: ["gpt", "ai"],
    desc: "🌟 GPT-4 Premium AI Assistant",
    category: "ai",
    react: "🌟",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("```🌟 GPT-4 PREMIUM ASSISTANT```\n\n*Please ask your question:*\nExample: `.gpt4 What is artificial intelligence?`");

        await react("⏳");
        
        const apiUrl = `https://ultimetron.guruapi.tech/gpt?prompt=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        
        let responseText = data.result || data.response || data.message || "No response from API";
        
        const response = `╭━━━〔 🌟 *GPT-4 PREMIUM* 〕━━━╮\n` +
                        `┃\n` +
                        `┃ *📝 QUERY:*\n` +
                        `┃ \`\`\`${q}\`\`\`\n` +
                        `┃\n` +
                        `┃ *💡 RESPONSE:*\n` +
                        `┃ ${responseText}\n` +
                        `┃\n` +
                        `╰━━━━━━━━━━━━━━━━━━╯\n` +
                        `> *Powered by GPT-4* ✨`;

        await reply(response);
        await react("✅");
    } catch (e) {
        console.error("GPT-4 Error:", e);
        await react("❌");
        reply("```❌ GPT-4 ERROR```\n\n*Failed to process request.*\n> Please try again later.");
    }
});

// ==================== BING CHAT AI ====================
cmd({
    pattern: "bing",
    alias: ["bingai", "bingchat"],
    desc: "🔍 Microsoft Bing Chat AI",
    category: "ai",
    react: "🔍",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("```🔍 BING CHAT AI```\n\n*What do you want to search?*\nExample: `.bing Latest technology news`");

        await react("⏳");
        
        const apiUrl = `https://vapis.my.id/api/ai-bing?q=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        
        let responseText = data.message || data.result || data.response || "Search completed";
        
        const response = `╭━━━〔 🔍 *BING CHAT* 〕━━━╮\n` +
                        `┃\n` +
                        `┃ *🔎 SEARCH:*\n` +
                        `┃ \`\`\`${q}\`\`\`\n` +
                        `┃\n` +
                        `┃ *📄 RESULTS:*\n` +
                        `┃ ${responseText}\n` +
                        `┃\n` +
                        `╰━━━━━━━━━━━━━━━━━━╯\n` +
                        `> *Powered by Microsoft Bing* 🌐`;

        await reply(response);
        await react("✅");
    } catch (e) {
        console.error("Bing Error:", e);
        await react("❌");
        reply("```❌ BING ERROR```\n\n*Search failed.*\n> Please try again later.");
    }
});

// ==================== DEEPSEEK AI ====================
cmd({
    pattern: "deepseek",
    alias: ["deep", "seek"],
    desc: "🌊 DeepSeek Advanced AI",
    category: "ai",
    react: "🌊",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("```🌊 DEEPSEEK AI```\n\n*What do you want to know?*\nExample: `.deepseek Explain quantum computing`");

        await react("⏳");
        
        const apiUrl = `https://api.ryzendesu.vip/api/ai/deepseek?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        
        let responseText = data.answer || data.result || data.response || "Processing complete";
        
        const response = `╭━━━〔 🌊 *DEEPSEEK AI* 〕━━━╮\n` +
                        `┃\n` +
                        `┃ *🎯 QUERY:*\n` +
                        `┃ \`\`\`${q}\`\`\`\n` +
                        `┃\n` +
                        `┃ *🧠 ANALYSIS:*\n` +
                        `┃ ${responseText}\n` +
                        `┃\n` +
                        `╰━━━━━━━━━━━━━━━━━━╯\n` +
                        `> *Powered by DeepSeek* ⚡`;

        await reply(response);
        await react("✅");
    } catch (e) {
        console.error("DeepSeek Error:", e);
        await react("❌");
        reply("```❌ DEEPSEEK ERROR```\n\n*Analysis failed.*\n> Please try again later.");
    }
});

// ==================== OPENAI CHATGPT ====================
cmd({
    pattern: "openai",
    alias: ["chatgpt", "gpt3"],
    desc: "🧠 OpenAI ChatGPT",
    category: "ai",
    react: "🧠",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("```🧠 OPENAI CHATGPT```\n\n*How can I help?*\nExample: `.openai Write a story about a robot`");

        await react("⏳");
        
        const apiUrl = `https://vapis.my.id/api/openai?q=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        
        let responseText = data.result || data.message || data.response || "Response generated";
        
        const response = `╭━━━〔 🧠 *CHATGPT* 〕━━━╮\n` +
                        `┃\n` +
                        `┃ *💬 YOU:*\n` +
                        `┃ \`\`\`${q}\`\`\`\n` +
                        `┃\n` +
                        `┃ *🤖 CHATGPT:*\n` +
                        `┃ ${responseText}\n` +
                        `┃\n` +
                        `╰━━━━━━━━━━━━━━━━━━╯\n` +
                        `> *Powered by OpenAI* ✨`;

        await reply(response);
        await react("✅");
    } catch (e) {
        console.error("OpenAI Error:", e);
        await react("❌");
        reply("```❌ OPENAI ERROR```\n\n*Failed to generate response.*\n> Please try again later.");
    }
});

// ==================== DJ AI - MUSIC EXPERT ====================
cmd({
    pattern: "dj",
    alias: ["musicai", "djbhai"],
    desc: "🎵 DJ AI Music Expert",
    category: "ai",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("```🎵 DJ AI MUSIC EXPERT```\n\n*Ask about music, artists, or songs:*\nExample: `.dj Suggest relaxing songs`");

        await react("⏳");
        
        const musicPrompt = `As a music expert, please answer this music-related question: ${q}`;
        const apiUrl = `https://ultimetron.guruapi.tech/gpt?prompt=${encodeURIComponent(musicPrompt)}`;
        const { data } = await axios.get(apiUrl);
        
        let responseText = data.result || data.response || data.message || "Music information retrieved";
        
        const response = `╭━━━〔 🎵 *DJ AI* 〕━━━╮\n` +
                        `┃\n` +
                        `┃ *🎧 MUSIC QUERY:*\n` +
                        `┃ \`\`\`${q}\`\`\`\n` +
                        `┃\n` +
                        `┃ *🎼 RESPONSE:*\n` +
                        `┃ ${responseText}\n` +
                        `┃\n` +
                        `╰━━━━━━━━━━━━━━━━━━╯\n` +
                        `> *Your Personal Music AI* 🎶`;

        await reply(response);
        await react("✅");
    } catch (e) {
        console.error("DJ AI Error:", e);
        await react("❌");
        reply("```❌ DJ AI ERROR```\n\n*Music assistant is busy.*\n> Please try again later.");
    }
});

// ==================== BOT ASSISTANT ====================
cmd({
    pattern: "bot",
    alias: ["assistant", "helper"],
    desc: "🤖 General Bot Assistant",
    category: "ai",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("```🤖 BOT ASSISTANT```\n\n*How can I help you today?*\nExample: `.bot What is your name?`");

        await react("⏳");
        
        const apiUrl = `https://ultimetron.guruapi.tech/gpt?prompt=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);
        
        let responseText = data.result || data.response || data.message || "I'm here to help!";
        
        const response = `╭━━━〔 🤖 *BOT* 〕━━━╮\n` +
                        `┃\n` +
                        `┃ *🗣️ YOU ASKED:*\n` +
                        `┃ \`\`\`${q}\`\`\`\n` +
                        `┃\n` +
                        `┃ *💡 BOT SAYS:*\n` +
                        `┃ ${responseText}\n` +
                        `┃\n` +
                        `╰━━━━━━━━━━━━━━━━━━╯\n` +
                        `> *Always here to assist you* 🤝`;

        await reply(response);
        await react("✅");
    } catch (e) {
        console.error("Bot Error:", e);
        await react("❌");
        reply("```❌ BOT ERROR```\n\n*Failed to respond.*\n> Please try again later.");
    }
});

// ==================== LLAVA AI - VISION ASSISTANT ====================
cmd({
    pattern: "llava",
    alias: ["visionai", "imageai"],
    desc: "🖼️ LLAVA Vision AI Assistant",
    category: "ai",
    react: "🖼️",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("```🖼️ LLAVA VISION AI```\n\n*Ask about images or vision-related questions:*\nExample: `.llava Describe a beautiful sunset`");

        await react("⏳");
        
        const visionPrompt = `As a vision AI expert, please answer this: ${q}`;
        const apiUrl = `https://ultimetron.guruapi.tech/gpt?prompt=${encodeURIComponent(visionPrompt)}`;
        const { data } = await axios.get(apiUrl);
        
        let responseText = data.result || data.response || data.message || "Vision analysis complete";
        
        const response = `╭━━━〔 🖼️ *LLAVA AI* 〕━━━╮\n` +
                        `┃\n` +
                        `┃ *👁️ VISION QUERY:*\n` +
                        `┃ \`\`\`${q}\`\`\`\n` +
                        `┃\n` +
                        `┃ *📸 ANALYSIS:*\n` +
                        `┃ ${responseText}\n` +
                        `┃\n` +
                        `╰━━━━━━━━━━━━━━━━━━╯\n` +
                        `> *Powered by LLAVA Vision AI* 👁️`;

        await reply(response);
        await react("✅");
    } catch (e) {
        console.error("LLAVA Error:", e);
        await react("❌");
        reply("```❌ LLAVA ERROR```\n\n*Vision analysis failed.*\n> Please try again later.");
    }
});

// ==================== CODE ASSISTANT ====================
cmd({
    pattern: "code",
    alias: ["programming", "coding"],
    desc: "💻 AI Programming Assistant",
    category: "ai",
    react: "💻",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("```💻 CODE ASSISTANT```\n\n*Ask programming questions:*\nExample: `.code How to write a function in JavaScript?`");

        await react("⏳");
        
        const codePrompt = `As a programming expert, please help with this coding question: ${q}`;
        const apiUrl = `https://ultimetron.guruapi.tech/gpt?prompt=${encodeURIComponent(codePrompt)}`;
        const { data } = await axios.get(apiUrl);
        
        let responseText = data.result || data.response || data.message || "Code assistance provided";
        
        const response = `╭━━━〔 💻 *CODE AI* 〕━━━╮\n` +
                        `┃\n` +
                        `┃ *🔧 PROGRAMMING Q:*\n` +
                        `┃ \`\`\`${q}\`\`\`\n` +
                        `┃\n` +
                        `┃ *📝 SOLUTION:*\n` +
                        `┃ ${responseText}\n` +
                        `┃\n` +
                        `╰━━━━━━━━━━━━━━━━━━╯\n` +
                        `> *Your Programming Assistant* 👨‍💻`;

        await reply(response);
        await react("✅");
    } catch (e) {
        console.error("Code AI Error:", e);
        await react("❌");
        reply("```❌ CODE AI ERROR```\n\n*Failed to provide code assistance.*\n> Please try again later.");
    }
});
