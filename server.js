const express = require("express");

const express = require("express");
const app = express();
const app = express();

const API_KEY = process.env.GNEWS_API_KEY;

app.get("/", async (req, res) => {

  const url = `https://gnews.io/api/v4/search?q=boxing%20OR%20UFC&lang=en&max=10&apikey=${API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  let articles = data.articles || [];

  let html = `
  <html>
  <head>
  <title>Fight Feed</title>
  <style>
  body{
    background:#050510;
    color:white;
    font-family:Arial;
    padding:20px;
  }

  h1{
    color:red;
  }

  .card{
    background:#111;
    padding:20px;
    border-radius:20px;
    margin-bottom:20px;
  }

  a{
    color:white;
    text-decoration:none;
  }
  </style>
  </head>
  <body>

  <h1>🥊 Fight Feed</h1>
  <p>Live Boxing & MMA News</p>
  `;

  articles.forEach(article => {
    html += `
    <div class="card">
      <h2>${article.title}</h2>
      <p>${article.description || ""}</p>
      <a href="${article.url}" target="_blank">Read More</a>
    </div>
    `;
  });

  html += `
  </body>
  </html>
  `;

  res.send(html);

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running");
});
