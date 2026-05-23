const express = require('express');

const app = express();

app.get('/', (req, res) => {

  res.send(`

  <html>

    <head>

      <title>Fight Feed</title>

      <style>

        body {

          background: #111;

          color: white;

          font-family: Arial;

          margin: 0;

          padding: 0;

        }

        header {

          background: red;

          padding: 20px;

          text-align: center;

          font-size: 32px;

          font-weight: bold;

        }

        .news {

          padding: 20px;

        }

        .card {

          background: #1c1c1c;

          padding: 15px;

          margin-bottom: 15px;

          border-radius: 10px;

        }

        h2 {

          color: red;

        }

      </style>

    </head>

    <body>

      <header>🥊 Fight Feed MMA & Boxing News</header>

      <div class="news">

        <div class="card">

          <h2>UFC News</h2>

          <p>Latest UFC fight announcements and breaking news.</p>

        </div>

        <div class="card">

          <h2>Boxing News</h2>

          <p>Heavyweight updates, rankings and fight rumours.</p>

        </div>

        <div class="card">

          <h2>Live Results</h2>

          <p>Fight night results updated automatically.</p>

        </div>

      </div>

    </body>

  </html>

  `);

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log('Server running');

});
