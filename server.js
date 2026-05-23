const express = require('express');
const app = express();

const news = [
  {
    category: "UFC",
    title: "Conor McGregor return rumours heat up",
    text: "Fans speculate about a possible UFC comeback later this year."
  },
  {
    category: "Boxing",
    title: "Tyson Fury hints at another fight",
    text: "Heavyweight division could see another mega fight announced soon."
  },
  {
    category: "MMA",
    title: "PFL announces new tournament",
    text: "Major names expected to enter the upcoming season."
  }
];

app.get('/', (req, res) => {

  const newsHTML = news.map(article => `
    <div class="card">
      <div class="tag">${article.category}</div>
      <h2>${article.title}</h2>
      <p>${article.text}</p>
    </div>
  `).join('');

  res.send(`<!DOCTYPE html>
<html>
<head>
  <title>Fight Feed</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body {
      margin:0;
      font-family:Arial;
      background:#0b0b0f;
      color:white;
    }

    header {
      padding:25px 18px;
      background:linear-gradient(135deg,#d60000,#111);
    }

    h1 {
      margin:0;
      font-size:32px;
    }

    .tabs {
      display:flex;
      gap:10px;
      padding:15px;
      overflow:auto;
    }

    .tab {
      background:#222;
      padding:10px 16px;
      border-radius:20px;
    }

    .active {
      background:#d60000;
    }

    .card {
      background:#18181f;
      margin:15px;
      padding:18px;
      border-radius:16px;
    }

    .tag {
      color:#ff4444;
      font-weight:bold;
      margin-bottom:10px;
    }

    footer {
      text-align:center;
      color:#888;
      padding:25px;
    }
  </style>
</head>

<body>

<header>
  <h1>🥊 Fight Feed</h1>
  <p>Boxing & MMA news in one place</p>
</header>

<div class="tabs">
  <div class="tab active">All</div>
  <div class="tab">UFC</div>
  <div class="tab">Boxing</div>
  <div class="tab">MMA</div>
  <div class="tab">Results</div>
</div>

${newsHTML}

<footer>
  Fight Feed © 2026
</footer>

</body>
</html>`);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server running');
});
