const express = require("express");
const app = express();

const API_KEY = process.env.GNEWS_API_KEY;

app.get("/", async (req, res) => {
  try {
    const url = `https://gnews.io/api/v4/search?q=boxing%20OR%20UFC%20OR%20MMA&lang=en&max=10&apikey=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();
    const articles = data.articles || [];

    const newsHTML = articles.map(article => `
      <div class="card">
        <h2>${article.title}</h2>
        <p>${article.description || ""}</p>
        <a href="${article.url}" target="_blank">Read More</a>
      </div>
    `).join("");

    res.send(`
      <html>
      <head>
        <title>Fight Feed</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { background:#050510; color:white; font-family:Arial; margin:0; padding:20px; }
          h1 { color:#ff2222; font-size:36px; }
          .card { background:#18181f; padding:20px; border-radius:18px; margin-bottom:18px; }
          a { color:#ff4444; font-weight:bold; }
        </style>
      </head>
      <body>
        <h1>🥊 Fight Feed</h1>
        <p>Live Boxing & MMA News</p>
        ${newsHTML}
      </body>
      </html>
    `);
  } catch (error) {
    res.send("<h1>Fight Feed</h1><p>News loading error. Try again shortly.</p>");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
