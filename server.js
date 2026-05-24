const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;
const GNEWS_API_KEY = process.env.GNEWS_API_KEY;

app.use(express.static(__dirname));

app.get("/", async (req, res) => {

  let articles = [];
  let error = "";

  try {

    const response = await fetch(
      `https://gnews.io/api/v4/search?q=boxing%20OR%20mma%20OR%20ufc&lang=en&max=10&apikey=${GNEWS_API_KEY}`
    );

    const data = await response.json();

    if (data.articles) {
      articles = data.articles;
    } else {
      error = JSON.stringify(data, null, 2);
    }

  } catch (err) {

    error = err.message;

  }

  const html = `
  <!DOCTYPE html>
  <html>

  <head>

    <title>Fight Feed</title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta name="theme-color" content="#b30000">

    <link rel="manifest" href="/manifest.json">

    <style>

      body {
        margin: 0;
        background: #050510;
        color: white;
        font-family: Arial, sans-serif;
      }

      .header {
        background: linear-gradient(135deg,#cc0000,#200000,#000);
        padding: 30px 20px;
      }

      .header h1 {
        margin: 0;
        font-size: 52px;
        color: #ff4d4d;
      }

      .header p {
        color: #ddd;
        margin-top: 10px;
        font-size: 18px;
      }

      .tabs {
        display: flex;
        gap: 10px;
        padding: 14px;
        overflow-x: auto;
      }

      .tab {
        background: #1b1b1b;
        color: white;
        padding: 12px 18px;
        border-radius: 999px;
        font-size: 18px;
        white-space: nowrap;
      }

      .active {
        background: #ff0000;
      }

      .container {
        padding: 14px;
      }

      .card {
        background: #11111c;
        border-radius: 22px;
        overflow: hidden;
        margin-bottom: 22px;
      }

      .card img {
        width: 100%;
        height: 220px;
        object-fit: cover;
      }

      .content {
        padding: 20px;
      }

      .content h2 {
        margin-top: 0;
        font-size: 22px;
        line-height: 1.3;
      }

      .content p {
        color: #ccc;
        line-height: 1.5;
      }

      .readmore {
        display: inline-block;
        margin-top: 14px;
        color: #ff4d4d;
        text-decoration: none;
        font-weight: bold;
      }

    </style>

  </head>

  <body>

    <div class="header">
      <h1>🥊 Fight Feed</h1>
      <p>Live Boxing & MMA News</p>
    </div>

    <div class="tabs">
      <div class="tab active">All</div>
      <div class="tab">UFC</div>
      <div class="tab">Boxing</div>
      <div class="tab">MMA</div>
      <div class="tab">Results</div>
    </div>

    <div class="container">

      ${
        articles.length > 0

        ? articles.map(article => `

          <div class="card">

            ${article.image ? `<img src="${article.image}" />` : ""}

            <div class="content">

              <h2>${article.title}</h2>

              <p>${article.description || ""}</p>

              <a class="readmore" href="${article.url}" target="_blank">
                Read Full Story →
              </a>

            </div>

          </div>

        `).join("")

        : `

          <h2>No articles loaded.</h2>

          <pre>${error}</pre>

        `
      }

    </div>

  </body>

  </html>
  `;

  res.send(html);

});

app.get("/manifest.json", (req, res) => {

  res.json({

    name: "Fight Feed",

    short_name: "FightFeed",

    start_url: "/",

    display: "standalone",

    background_color: "#050510",

    theme_color: "#b30000",

    icons: [
      {
        src: "/E0A332BD-43E5-43B9-81D0-196FE97ABA84.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]

  });

});

app.listen(PORT, () => {

  console.log("Server running on port " + PORT);

});
