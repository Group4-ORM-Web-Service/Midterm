const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');
const orderRoutes = require('./src/routes/orderRoutes');
const categoryRoute = require('./src/routes/categoryRoutes');
const productRoutes = require('./src/routes/productRoutes');
const productVariantRoutes = require('./src/routes/productVariantRoutes');
const supplierRoute = require('./src/routes/supplierRoutes');

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT;
const app = express();

app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send(`Welcome to Product Management System! \n Please follow the urls below to access the data`);
});

app.use("/orders", orderRoutes);
app.use("/categories", categoryRoute);
app.use("/products", productRoutes);
app.use("/product-variants", supplierRoute);
app.use("/suppliers", productVariantRoutes);

app.listen(SERVER_PORT, () => {
  console.log(`Server listening at http://localhost:${SERVER_PORT}`);
});

