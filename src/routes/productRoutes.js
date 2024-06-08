const express = require("express");
const productRoutes = express.Router();

const productController = require("../controllers/productController");


productRoutes.get("", productController.getProductByPagination);

productRoutes.get("/:id", productController.getProduct);

productRoutes.post("/add-product", productController.addNewProduct);

productRoutes.put("/update-product-by/:id", productController.updateProduct);

productRoutes.delete("/remove-product-by/:id", productController.deleteProduct);

module.exports = productRoutes;