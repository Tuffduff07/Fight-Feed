const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
const GNEWS_API_KEY = process.env.GNEWS_API_KEY;

app.use(express.static(__dirname));

const LOGO_PATH = "/E0A332BD-43E5-43B9-81D0-145E57A73F69.png";

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
        src: LOGO_PATH,
        sizes: "512x512",
        type: "image/png"
      }
    ]
  });
});

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>Fight Feed</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="manifest" href="/manifest.json">
  <meta name="theme-color" content="#b30000">
  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background: #050510;
      color: white;
    }

    .header {
      background: linear-gradient(135deg, #b30000, #050510);
      padding: 35px 25px;
    }

    .title-row {
      display: flex;
      align-items: center;
      gap: 18px;
    }

    .logo {
      width: 70px;
      height: 70px;
      border-radius: 14px;
    }

    h1 {
      font-size: 44px;
      margin: 0;
      color: #ff4a4a;
    }

    .subtitle {
      font-size: 22px;
      margin-top: 20px;
    }

    .tabs {
      display: flex;
      gap: 12px;
      overflow-x: auto;
      padding: 20px;
      background: #070716;
    }

    .tab {
      background: #222;
      color: white;
      border: none;
      padding: 14px 25px;
      border-radius: 30px;
      font-size: 20px;
    }

    .active {
      background: red;
    }

    .section {
      padding: 20px;
    }

    h2 {
      font-size: 28px;
      margin-bottom: 15px;
    }

    .fight-card, .article {
      background: #121225;
      border-radius: 16px;
      padding: 18px;
      margin-bottom: 15px;
      border-left: 5px solid red;
    }

    .fight-title {
      font-size: 21px;
      font-weight: bold;
    }

    .fight-date {
      color: #ccc;
      margin-top: 8px;
    }

    .article a {
      color: white;
      text-decoration: none;
      font-size: 20px;
      font-weight: bold;
    }

    .source {
      color: #aaa;
      margin-top: 8px;
      font-size: 14px;
    }

    .error {
      color: #ffb3b3;
      white-space: pre-wrap;
      font-family: monospace;
    }
  </style>
</head>
<body>

  <div class="header">
    <div class="title-row">
      <img class="logo" src="${LOGO_PATH}">
      <h1>Fight Feed</h1>
    </div>
    <div class="subtitle">Live Boxing & MMA News</div>
  </div>

  <div class="tabs">
    <button class="tab active" onclick="loadNews('boxing mma ufc')">All</button>
    <button class="tab" onclick="loadNews('ufc')">UFC</button>
    <button class="tab" onclick="loadNews('boxing')">Boxing</button>
    <button class="tab" onclick="loadNews('mma')">MMA</button>
    <button class="tab" onclick="loadNews('fight results boxing mma')">Results</button>
  </div>

  <div class="section">
    <h2>Upcoming Fights</h2>

    <div class="fight-card">
      <div class="fight-title">UFC Fight Night</div>
      <div class="fight-date">Upcoming card — check latest updates</div>
    </div>

    <div class="fight-card">
      <div class="fight-title">Boxing Main Event</div>
      <div class="fight-date">Upcoming fight night — details coming soon</div>
    </div>

    <div class="fight-card">
      <div class="fight-title">MMA Results & Fight Week</div>
      <div class="fight-date">Latest fight news below</div>
    </div>
  </div>

  <div class="section">
    <h2>Latest News</h2>
    <div id="news">Loading news...</div>
  </div>

<script>
async function loadNews(searchTerm) {
  document.getElementById("news").innerHTML = "Loading news...";

  document.querySelectorAll(".tab").forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");

  try {
    const response = await fetch("/news?q=" + encodeURIComponent(searchTerm));
    const data = await response.json();

    if (!data.articles || data.articles.length === 0) {
      document.getElementById("news").innerHTML =
        "<h2>No articles loaded.</h2><div class='error'>" + JSON.stringify(data, null, 2) + "</div>";
      return;
    }

    document.getElementById("news").innerHTML = data.articles.map(article => \`
      <div class="article">
        <a href="\${article.url}" target="_blank">\${article.title}</a>
        <div class="source">\${article.source.name || "Fight News"}</div>
      </div>
    \`).join("");

  } catch (err) {
    document.getElementById("news").innerHTML =
      "<h2>No articles loaded.</h2><div class='error'>" + err.message + "</div>";
  }
}

loadNews("boxing mma ufc");
</script>

</body>
</html>
  `);
});

app.get("/news", async (req, res) => {
  const query = req.query.q || "boxing mma ufc";

  try {
    const url =
      "https://gnews.io/api/v4/search?q=" +
      encodeURIComponent(query) +
      "&lang=en&max=10&apikey=" +
      GNEWS_API_KEY;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log("Fight Feed running on port " + PORT);
});
