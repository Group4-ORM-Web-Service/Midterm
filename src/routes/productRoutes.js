const express = require("express");
const productRoutes = express.Router();

const productController = require("../controllers/productController");


productRoutes.get("/products", productController.getProductByPagination);

productRoutes.get("/products/:id", productController.getProduct);

productRoutes.post("/products/add-product", productController.addNewProduct);

productRoutes.put("/products/update-product-by/:id", productController.updateProduct);

productRoutes.delete("/products/remove-product-by/:id", productController.deleteProduct);

module.exports = productRoutes;