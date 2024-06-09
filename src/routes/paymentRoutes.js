const express = require("express");
const paymentRoutes = express.Router();

const paymentController = require("../controllers/paymentController");


paymentRoutes.get("", paymentController.getPaymentByPagination);

paymentRoutes.get("/:id", paymentController.getPaymentById);

paymentRoutes.post("/add-payment", paymentController.addNewPayment);

paymentRoutes.put("/update-payment-by/:id", paymentController.updatePayment);

paymentRoutes.delete("/remove-payment-by/:id", paymentController.deletePayment);

module.exports = paymentRoutes;