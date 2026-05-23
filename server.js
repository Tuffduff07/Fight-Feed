const express = require("express");
const fetch = require("node-fetch");

const app = express();

const API_KEY = process.env.GNEWS_API_KEY;

app.get("/", async (req, res) => {
  try {

    const response = await fetch(
      `https://gnews.io/api/v4/search?q=boxing%20OR%20mma&lang=en&max=10&apikey=${API_KEY}`
    );

    const data = await response.json();

    console.log(data);

    const articles = data.articles || [];

    if (!articles.length) {
      return res.send(`
        <body style="background:#050510;color:white;font-family:Arial;padding:30px;">
          <h1>🥊 Fight Feed</h1>
          <p>No live articles loaded.</p>
          <pre>${JSON.stringify(data, null, 2)}</pre>
        </body>
      `);
    }

    const newsHtml = articles.map(article => `
      <div style="
        background:#111122;
        padding:20px;
        margin-bottom:20px;
        border-radius:16px;
      ">
        <h2 style="color:#ff4d4d;">
          ${article.title}
        </h2>

        <p>
          ${article.description || "No description available"}
        </p>

        <a href="${article.url}" target="_blank"
          style="
            color:#ff4d4d;
            text-decoration:none;
            font-weight:bold;
          ">
          Read More →
        </a>
      </div>
    `).join("");

    res.send(`
      <body style="
        background:#050510;
        color:white;
        font-family:Arial;
        padding:30px;
      ">

        <h1 style="
          color:#ff4d4d;
          font-size:60px;
        ">
          🥊 Fight Feed
        </h1>

        <p style="font-size:28px;">
          Live Boxing & MMA News
        </p>

        ${newsHtml}

      </body>
    `);

  } catch (error) {

    console.log(error);

    res.send(`
      <body style="
        background:#050510;
        color:white;
        font-family:Arial;
        padding:30px;
      ">
        <h1>🥊 Fight Feed</h1>

        <h2 style="color:red;">
          Error Loading News
        </h2>

        <pre>${error}</pre>
      </body>
    `);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
