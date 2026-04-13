const axios = require('axios');
const { cmd } = require('../command');

cmd({
    pattern: "movie",
    alias: ["film", "imdb", "movies"],
    desc: "Fetch detailed information about a movie.",
    category: "utility",
    react: "🎬",
    filename: __filename
},
async (conn, mek, m, { from, reply, sender, args }) => {
    try {
        // Properly extract the movie name from arguments
        const movieName = args.length > 0 ? args.join(' ') : m.text.replace(/^[\.\#\$\!]?movie\s?/i, '').trim();
        
        if (!movieName) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎬 *MOVIE SEARCH*
*│*
*│* 📽️ Please provide a movie name!
*│*
*│* 📝 *Example:* .movie Iron Man
*│* 📝 *Example:* .movie Inception
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        // Add reaction
        await conn.sendMessage(from, { react: { text: '🎬', key: m.key } });

        const apiUrl = `https://apis.davidcyriltech.my.id/imdb?query=${encodeURIComponent(movieName)}`;
        const response = await axios.get(apiUrl);

        if (!response.data.status || !response.data.movie) {
            return reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎬 *MOVIE SEARCH*
*│*
*│* 🚫 Movie *"${movieName}"* not found!
*│* Please check the name and try again.
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
            );
        }

        const movie = response.data.movie;
        
        // Get Rotten Tomatoes rating
        const rtRating = movie.ratings?.find(r => r.source === 'Rotten Tomatoes')?.value || 'N/A';
        
        // Format the caption
        const dec = `*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎬 *MOVIE INFORMATION*
*│*
*│* 📽️ *Title:* ${movie.title} (${movie.year})
*│* 🎞️ *Rated:* ${movie.rated || 'N/A'}
*│*
*│* ⭐ *IMDb:* ${movie.imdbRating || 'N/A'}/10
*│* 🍅 *Rotten Tomatoes:* ${rtRating}
*│* 💰 *Box Office:* ${movie.boxoffice || 'N/A'}
*│*
*│* 📅 *Released:* ${new Date(movie.released).toLocaleDateString()}
*│* ⏳ *Runtime:* ${movie.runtime}
*│* 🎭 *Genre:* ${movie.genres}
*│*
*│* 📝 *Plot:* ${movie.plot}
*│*
*│* 🎥 *Director:* ${movie.director}
*│* ✍️ *Writer:* ${movie.writer}
*│* 🌟 *Actors:* ${movie.actors}
*│*
*│* 🌍 *Country:* ${movie.country}
*│* 🗣️ *Language:* ${movie.languages}
*│* 🏆 *Awards:* ${movie.awards || 'None'}
*│*
*│* 🔗 *IMDb:* ${movie.imdbUrl}
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`;

        // Send message with poster
        await conn.sendMessage(
            from,
            {
                image: { 
                    url: movie.poster && movie.poster !== 'N/A' ? movie.poster : 'https://files.catbox.moe/s3cve5.jpg'
                },
                caption: dec,
                contextInfo: {
                    mentionedJid: [sender],
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

        // Success reaction
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (e) {
        console.error('Movie command error:', e);
        reply(
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*
*│ ╌─̇─̣⊰ 𓆩ု᪳𝐌𝐔𝐙𝐀𝐌𝐌𝐈𝐋ှ᪳𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│*
*│* 🎬 *MOVIE SEARCH*
*│*
*│* ❌ *Error:* ${e.message}
*│*
*│* 📌 *Powered by MUZAMMIL-MD*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈⟢*`
        );
    }
});