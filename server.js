const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

const articles = [
  {
    title: "UFC Fight Night Preview",
    category: "UFC",
    summary: "A quick look at the biggest UFC matchups coming up this weekend.",
  },
  {
    title: "Boxing Heavyweight Division Heating Up",
    category: "Boxing",
    summary: "The heavyweight scene is building again with major fights expected soon.",
  },
  {
    title: "MMA Rankings Update",
    category: "Rankings",
    summary: "A simple breakdown of the fighters making moves in the rankings.",
  },
  {
    title: "Upcoming Fight Card Watchlist",
    category: "Upcoming Fights",
    summary: "The key fights fans should keep an eye on over the next few weeks.",
  },
  {
    title: "Fight Results Round-Up",
    category: "Results",
    summary: "Recent MMA and boxing results rounded up in one place.",
  },
];

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Fight Feed</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: #111;
          color: white;
        }
        header {
          background: #000;
          padding: 20px;
          text-align: center;
          border-bottom: 3px solid #e50914;
        }
        nav {
          background: #1c1c1c;
          padding: 12px;
          text-align: center;
        }
        nav a {
          color: white;
          margin: 0 10px;
          text-decoration: none;
          font-weight: bold;
        }
        .hero {
          padding: 30px 20px;
          text-align: center;
          background: linear-gradient(#222, #111);
        }
        .hero h1 {
          color: #e50914;
          font-size: 40px;
        }
        .container {
          padding: 20px;
          max-width: 1000px;
          margin: auto;
        }
        .card {
          background: #1d1d1d;
          margin-bottom: 18px;
          padding: 18px;
          border-radius: 10px;
          border-left: 5px solid #e50914;
        }
        .category {
          color: #e50914;
          font-weight: bold;
          font-size: 14px;
        }
        footer {
          background: #000;
          text-align: center;
          padding: 20px;
          margin-top: 40px;
          font-size: 14px;
        }
        footer a {
          color: #e50914;
          margin: 0 8px;
          text-decoration: none;
        }
      </style>
    </head>
    <body>

      <header>
        <h1>Fight Feed</h1>
        <p>MMA & Boxing News, Results and Fight Updates</p>
      </header>

      <nav>
        <a href="/">Home</a>
        <a href="/ufc">UFC</a>
        <a href="/boxing">Boxing</a>
        <a href="/results">Results</a>
        <a href="/upcoming-fights">Upcoming Fights</a>
        <a href="/rankings">Rankings</a>
      </nav>

      <section class="hero">
        <h1>Latest Fight News</h1>
        <p>Your home for MMA, UFC and boxing updates.</p>
      </section>

      <div class="container">
        ${articles.map(article => `
          <div class="card">
            <div class="category">${article.category}</div>
            <h2>${article.title}</h2>
            <p>${article.summary}</p>
            <p>Fight Feed brings fans quick updates, previews and results from across combat sports.</p>
          </div>
        `).join("")}
      </div>

      <footer>
        <p>© 2026 Fight Feed</p>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms">Terms</a>
      </footer>

    </body>
    </html>
  `);
});

app.get("/ufc", (req, res) => {
  res.send(page("UFC News", "Latest UFC updates, fight previews, results and rankings."));
});

app.get("/boxing", (req, res) => {
  res.send(page("Boxing News", "Latest boxing stories, heavyweight updates, fight previews and results."));
});

app.get("/results", (req, res) => {
  res.send(page("Fight Results", "Recent MMA, UFC and boxing results collected in one place."));
});

app.get("/upcoming-fights", (req, res) => {
  res.send(page("Upcoming Fights", "Upcoming MMA and boxing cards to watch."));
});

app.get("/rankings", (req, res) => {
  res.send(page("Rankings", "MMA and boxing ranking updates and fighter movement."));
});

app.get("/about", (req, res) => {
  res.send(page("About Fight Feed", "Fight Feed is a combat sports news platform covering MMA, UFC, boxing, fight results, previews and rankings."));
});

app.get("/contact", (req, res) => {
  res.send(page("Contact", "For enquiries, contact Fight Feed by email at fightfeedapp@gmail.com."));
});

app.get("/privacy-policy", (req, res) => {
  res.send(page("Privacy Policy", "Fight Feed respects your privacy. We may use analytics and advertising services to improve the site. We do not sell personal information."));
});

app.get("/terms", (req, res) => {
  res.send(page("Terms and Conditions", "By using Fight Feed, you agree to use the site for personal information purposes only. Content is provided for general sports news and entertainment."));
});

function page(title, text) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title} | Fight Feed</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: #111;
          color: white;
        }
        header, footer {
          background: #000;
          text-align: center;
          padding: 20px;
        }
        nav {
          background: #1c1c1c;
          padding: 12px;
          text-align: center;
        }
        nav a {
          color: white;
          margin: 0 10px;
          text-decoration: none;
          font-weight: bold;
        }
        .content {
          max-width: 900px;
          margin: auto;
          padding: 30px 20px;
        }
        h1 {
          color: #e50914;
        }
        a {
          color: #e50914;
        }
      </style>
    </head>
    <body>
      <header>
        <h1>Fight Feed</h1>
      </header>

      <nav>
        <a href="/">Home</a>
        <a href="/ufc">UFC</a>
        <a href="/boxing">Boxing</a>
        <a href="/results">Results</a>
        <a href="/upcoming-fights">Upcoming Fights</a>
        <a href="/rankings">Rankings</a>
      </nav>

      <div class="content">
        <h1>${title}</h1>
        <p>${text}</p>
        <p>More updates will be added regularly as Fight Feed continues to grow.</p>
        <p><a href="/">Back to Home</a></p>
      </div>

      <footer>
        <p>© 2026 Fight Feed</p>
      </footer>
    </body>
    </html>
  `;
}

app.listen(PORT, () => {
  console.log(`Fight Feed running on port ${PORT}`);
});
