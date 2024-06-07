const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');
const orderRoutes = require('./src/routes/orderRoutes');

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT;
const app = express();

app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send(`Welcome to Product Management System! \n Please follow the urls below to access the data`);
});

app.use("/product-orders", orderRoutes);

app.listen(SERVER_PORT, () => {
  console.log(`Server listening at http://localhost:${SERVER_PORT}`);
});

