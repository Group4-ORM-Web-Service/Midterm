const express = require("express");
const orderRoutes = express.Router();

const orderController = require("../controllers/orderController");


orderRoutes.get("", orderController.getProductOrdersByPagination);

orderRoutes.get("/:id", orderController.getProductOrder);

orderRoutes.post("/add-order", orderController.addNewProductOrder);

orderRoutes.post("/add-multi-orders", orderController.addManyProductOrders);

orderRoutes.put("/update-order-by/:id", orderController.updateProductOrder);

orderRoutes.delete("/remove-order-by/:id", orderController.deleteProductOrder);

module.exports = orderRoutes;