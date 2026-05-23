const express = require("express");
const app = express();

const API_KEY = process.env.GNEWS_API_KEY;

app.get("/", async (req, res) => {

  try {

    const category = req.query.category || "boxing";

    let searchQuery = "boxing";

    if (category === "ufc") {
      searchQuery = "UFC";
    }

    if (category === "mma") {
      searchQuery = "MMA";
    }

    if (category === "results") {
      searchQuery = "boxing results OR mma results";
    }

    const url =
      `https://gnews.io/api/v4/search?q=${encodeURIComponent(searchQuery)}&lang=en&max=10&apikey=${API_KEY}`;

    const response = await fetch(url);

    const data = await response.json();

    const articles = data.articles || [];

    const newsHtml = articles.map(article => `

      <div style="
        background:#111122;
        border-radius:20px;
        overflow:hidden;
        margin-bottom:25px;
        box-shadow:0 0 20px rgba(0,0,0,0.4);
      ">

        ${article.image ? `
          <img
            src="${article.image}"
            style="
              width:100%;
              height:220px;
              object-fit:cover;
            "
          >
        ` : ""}

        <div style="padding:20px;">

          <h2 style="
            font-size:32px;
            margin-bottom:15px;
            color:white;
          ">
            ${article.title}
          </h2>

          <p style="
            color:#cccccc;
            line-height:1.5;
            font-size:20px;
          ">
            ${article.description || ""}
          </p>

          <a
            href="${article.url}"
            target="_blank"
            style="
              display:inline-block;
              margin-top:20px;
              color:#ff4444;
              font-weight:bold;
              font-size:22px;
              text-decoration:none;
            "
          >
            Read Full Story →
          </a>

        </div>

      </div>

    `).join("");

    res.send(`

      <body style="
        margin:0;
        background:#050510;
        color:white;
        font-family:Arial;
      ">

        <div style="
          background:linear-gradient(135deg,#b30000,#050510);
          padding:40px 25px;
        ">

          <h1 style="
            color:#ff4444;
            font-size:64px;
            margin:0;
          ">
            🥊 Fight Feed
          </h1>

          <p style="
            font-size:28px;
            color:#dddddd;
          ">
            Live Boxing & MMA News
          </p>

        </div>

        <div style="
          display:flex;
          gap:15px;
          overflow-x:auto;
          padding:20px;
        ">

          <a href="/"
            style="
              background:#ff0000;
              color:white;
              padding:14px 24px;
              border-radius:999px;
              text-decoration:none;
              font-size:22px;
            ">
            All
          </a>

          <a href="/?category=ufc"
            style="
              background:#222;
              color:white;
              padding:14px 24px;
              border-radius:999px;
              text-decoration:none;
              font-size:22px;
            ">
            UFC
          </a>

          <a href="/?category=boxing"
            style="
              background:#222;
              color:white;
              padding:14px 24px;
              border-radius:999px;
              text-decoration:none;
              font-size:22px;
            ">
            Boxing
          </a>

          <a href="/?category=mma"
            style="
              background:#222;
              color:white;
              padding:14px 24px;
              border-radius:999px;
              text-decoration:none;
              font-size:22px;
            ">
            MMA
          </a>

          <a href="/?category=results"
            style="
              background:#222;
              color:white;
              padding:14px 24px;
              border-radius:999px;
              text-decoration:none;
              font-size:22px;
            ">
            Results
          </a>

        </div>

        <div style="padding:20px;">
          ${newsHtml}
        </div>

      </body>

    `);

  } catch (error) {

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

        <pre>${error.message}</pre>

      </body>
    `);

  }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running");
});
