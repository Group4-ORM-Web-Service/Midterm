const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');
const orderRoutes = require('./src/routes/orderRoutes');
const categoryRoute = require('./src/routes/categoryRoutes');
const productRoutes = require('./src/routes/productRoutes');
const productVariantRoutes = require('./src/routes/productVariantRoutes');
const supplierRoute = require('./src/routes/supplierRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes')
const customerRoute = require('./src/routes/customerRoutes');

dotenv.config();

const PORT = process.env.PORT;
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
app.use("/payments", paymentRoutes)
app.use("/product-variants", productVariantRoutes);
app.use("/customers", customerRoute);
app.use("/suppliers", supplierRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server listening at http://localhost:${process.env.PORT}`);
});

