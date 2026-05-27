const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

const articles = require("./articles");

app.use(express.static("public"));

app.get("/", (req, res) => {

  res.send(`

  <!DOCTYPE html>
  <html>
  <head>

    <title>Fight Feed</title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>

      body{
        margin:0;
        font-family:Arial, sans-serif;
        background:#111;
        color:white;
      }

      header{
        background:#000;
        text-align:center;
        padding:20px;
        border-bottom:3px solid #e50914;
      }

      nav{
        background:#1c1c1c;
        padding:12px;
        text-align:center;
      }

      nav a{
        color:white;
        margin:0 10px;
        text-decoration:none;
        font-weight:bold;
      }

      .hero{
        padding:40px 20px;
        text-align:center;
        background:linear-gradient(#222,#111);
      }

      .hero h1{
        color:#ff0000;
        font-size:42px;
      }

      .container{
        max-width:1000px;
        margin:auto;
        padding:20px;
      }

      .card{
        background:#1d1d1d;
        margin-bottom:20px;
        padding:20px;
        border-radius:10px;
        border-left:5px solid #ff0000;
      }

      .category{
        color:#ff0000;
        font-size:14px;
        font-weight:bold;
        margin-bottom:10px;
      }

      .article-image{
        width:100%;
        border-radius:10px;
        margin-bottom:15px;
      }

      .card h2{
        margin-top:0;
      }

      .card a{
        display:inline-block;
        margin-top:10px;
        color:#ff0000;
        text-decoration:none;
        font-weight:bold;
      }

      footer{
        background:#000;
        text-align:center;
        padding:20px;
        margin-top:40px;
      }

      footer a{
        color:#ff0000;
        margin:0 8px;
        text-decoration:none;
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
      <p>Your home for combat sports updates.</p>
    </section>

    <div class="container">

      ${articles.map(article => `

        <div class="card">

          <div class="category">
            ${article.category}
          </div>

          <img 
            src="/images/E0A332BD-43E5-43B9-81D0-196FE97ABA84.png"
            class="article-image"
          >

          <h2>
            ${article.title}
          </h2>

          <p>
            ${article.summary}
          </p>

          <a href="/article/${article.slug}">
            Read Full Article →
          </a>

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

app.get("/article/:slug", (req, res) => {

  const article = articles.find(
    a => a.slug === req.params.slug
  );

  if(!article){
    return res.status(404).send("Article not found");
  }

  res.send(`

  <!DOCTYPE html>
  <html>
  <head>

    <title>${article.title}</title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>

      body{
        margin:0;
        font-family:Arial,sans-serif;
        background:#111;
        color:white;
      }

      header{
        background:#000;
        text-align:center;
        padding:20px;
        border-bottom:3px solid #ff0000;
      }

      .content{
        max-width:900px;
        margin:auto;
        padding:30px 20px;
      }

      .category{
        color:#ff0000;
        font-weight:bold;
      }

      .article-image{
        width:100%;
        border-radius:10px;
        margin:20px 0;
      }

      a{
        color:#ff0000;
        text-decoration:none;
      }

      footer{
        background:#000;
        text-align:center;
        padding:20px;
        margin-top:40px;
      }

    </style>

  </head>

  <body>

    <header>
      <h1>Fight Feed</h1>
    </header>

    <div class="content">

      <div class="category">
        ${article.category}
      </div>

      <h1>
        ${article.title}
      </h1>

      <img 
        src="/images/E0A332BD-43E5-43B9-81D0-196FE97ABA84.png"
        class="article-image"
      >

      <p>
        ${article.date}
      </p>

      <p>
        ${article.body}
      </p>

      <br>

      <a href="/">
        ← Back to Home
      </a>

    </div>

    <footer>
      <p>© 2026 Fight Feed</p>
    </footer>

  </body>
  </html>

  `);

});

function simplePage(title, text){

  return `

  <!DOCTYPE html>
  <html>
  <head>

    <title>${title}</title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>

      body{
        margin:0;
        font-family:Arial,sans-serif;
        background:#111;
        color:white;
      }

      header{
        background:#000;
        text-align:center;
        padding:20px;
        border-bottom:3px solid #ff0000;
      }

      .content{
        max-width:900px;
        margin:auto;
        padding:30px 20px;
      }

      h1{
        color:#ff0000;
      }

      a{
        color:#ff0000;
      }

      footer{
        background:#000;
        text-align:center;
        padding:20px;
        margin-top:40px;
      }

    </style>

  </head>

  <body>

    <header>
      <h1>Fight Feed</h1>
    </header>

    <div class="content">

      <h1>${title}</h1>

      <p>${text}</p>

      <a href="/">
        ← Back to Home
      </a>

    </div>

    <footer>
      <p>© 2026 Fight Feed</p>
    </footer>

  </body>
  </html>

  `;

}

app.get("/ufc", (req,res)=>{
  res.send(simplePage(
    "UFC News",
    "Latest UFC news, previews, rankings and results."
  ));
});

app.get("/boxing", (req,res)=>{
  res.send(simplePage(
    "Boxing News",
    "Latest boxing updates from around the world."
  ));
});

app.get("/results", (req,res)=>{
  res.send(simplePage(
    "Fight Results",
    "Recent MMA and boxing results all in one place."
  ));
});

app.get("/upcoming-fights", (req,res)=>{
  res.send(simplePage(
    "Upcoming Fights",
    "Upcoming fight cards and major combat sports events."
  ));
});

app.get("/rankings", (req,res)=>{
  res.send(simplePage(
    "Rankings",
    "Updated MMA and boxing rankings."
  ));
});

app.get("/about", (req,res)=>{
  res.send(simplePage(
    "About Fight Feed",
    "Fight Feed is a combat sports news platform covering MMA and boxing."
  ));
});

app.get("/contact", (req,res)=>{
  res.send(simplePage(
    "Contact",
    "Email: fightfeedapp@gmail.com"
  ));
});

app.get("/privacy-policy", (req,res)=>{
  res.send(simplePage(
    "Privacy Policy",
    "Fight Feed may use analytics and advertising services."
  ));
});

app.get("/terms", (req,res)=>{
  res.send(simplePage(
    "Terms and Conditions",
    "By using Fight Feed you agree to our terms and policies."
  ));
});

app.listen(PORT, () => {
  console.log("Fight Feed running on port " + PORT);
});
