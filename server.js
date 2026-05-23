const express = require('express');

const app = express();

app.get('/', (req, res) => {

  res.send('<h1>Fight Feed Live 🥊</h1>');

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log('Server running');

});
