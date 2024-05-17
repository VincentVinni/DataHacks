const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send("AYO");
});

const port = 6969;
const host = 'localhost';

app.listen(port, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
