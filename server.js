const express = require("express");
const app = express();

const API_KEY = process.env.GNEWS_API_KEY;

app.get("/", async (req, res) => {
  try {
    const url = `https://gnews.io/api/v4/search?q=boxing&lang=en&max=10&apikey=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    const articles = data.articles || [];

    if (!articles.length) {
      return res.send(`
        <body style="background:#050510;color:white;font-family:Arial;padding:30px;">
          <h1>🥊 Fight Feed</h1>
          <p>No articles loaded.</p>
          <pre>${JSON.stringify(data, null, 2)}</pre>
        </body>
      `);
    }

    const cards = articles.map(article => `
      <div style="background:#18181f;padding:20px;margin-bottom:20px;border-radius:16px;">
        <h2>${article.title}</h2>
        <p>${article.description || ""}</p>
        <a href="${article.url}" target="_blank" style="color:#ff4444;">Read More</a>
      </div>
    `).join("");

    res.send(`
      <body style="background:#050510;color:white;font-family:Arial;padding:25px;">
        <h1 style="color:#ff4444;">🥊 Fight Feed</h1>
        <p>Live Boxing & MMA News</p>
        ${cards}
      </body>
    `);

  } catch (error) {
    res.send(`
      <body style="background:#050510;color:white;font-family:Arial;padding:30px;">
        <h1>🥊 Fight Feed</h1>
        <h2 style="color:red;">Error Loading News</h2>
        <pre>${error.message}</pre>
      </body>
    `);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
