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
const authRoutes = require('./src/routes/authRoutes');
const { pageNotFoundMiddleware, endPointNotFoundMiddleware } = require("./src/middlewares/notFoundMiddleWare");
const errorMiddleWare = require("./src/middlewares/errorMiddleWare");
const interceptMiddleWare = require("./src/middlewares/interceptMiddleWare");
const morgan = require('morgan');
const authMiddleware = require('./src/middlewares/authMiddleware');
const cors = require('cors');

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT;
const app = express();

// app.use(cors());
// or configure CORS options if needed
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(morgan("common"))

app.get("/", interceptMiddleWare, (req, res) => {
  console.log("Handling req");
  res.send(
    `
    <h1 style='color: red; justify-content: center; align-item: center'>
    Welcome to the Shop Card. You are the best in our organization.
    </h1>
    `
  );
});

app.use('/api', authRoutes);
app.use(authMiddleware);
app.use("/api", orderRoutes);
app.use("/api", categoryRoute);
app.use("/api", productRoutes);
app.use("/api", paymentRoutes)
app.use("/api", productVariantRoutes);
app.use("/api", customerRoute);
app.use("/api", supplierRoute);

app.use("/api", endPointNotFoundMiddleware)
app.use("/api", errorMiddleWare)
app.use("/", pageNotFoundMiddleware)


app.listen(SERVER_PORT, () => {
  console.log(`Server listening at http://localhost:${SERVER_PORT}`);
});

