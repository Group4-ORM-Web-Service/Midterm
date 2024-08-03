const express = require("express");
const orderRoutes = express.Router();

const orderController = require("../controllers/orderController");


orderRoutes.get("/orders", orderController.getProductOrdersByPagination);

orderRoutes.get("/orders/:id", orderController.getProductOrder);

orderRoutes.post("/orders/add-order", orderController.addNewProductOrder);

orderRoutes.put("/orders/update-order-by/:id", orderController.updateProductOrder);

orderRoutes.delete("/orders/remove-order-by/:id", orderController.deleteProductOrder);

module.exports = orderRoutes;