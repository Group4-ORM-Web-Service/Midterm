const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT;
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World! the best of the world the example');
});

app.listen(SERVER_PORT, () => {
  console.log(`Server listening at http://localhost:${SERVER_PORT}`);
});
