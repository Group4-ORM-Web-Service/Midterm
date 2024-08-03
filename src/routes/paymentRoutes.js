const express = require("express");
const paymentRoutes = express.Router();

const paymentController = require("../controllers/paymentController");


paymentRoutes.get("/payments", paymentController.getPaymentByPagination);

paymentRoutes.get("/payments/:id", paymentController.getPaymentById);

paymentRoutes.post("/payments/add-payment", paymentController.addNewPayment);

paymentRoutes.put("/payments/update-payment-by/:id", paymentController.updatePayment);

paymentRoutes.delete("/payments/remove-payment-by/:id", paymentController.deletePayment);

module.exports = paymentRoutes;