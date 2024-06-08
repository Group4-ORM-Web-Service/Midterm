const express = require("express");
const productVariantRoutes = express.Router();

const productVariantController = require("../controllers/productVariantController");


productVariantRoutes.get("", productVariantController.getProductVariantByPagination);

productVariantRoutes.get("/:id", productVariantController.getProductVariant);

productVariantRoutes.post("/add-product-variant", productVariantController.addNewProductVariant);

productVariantRoutes.put("/update-product-variant-by/:id", productVariantController.updateProductVariant);

productVariantRoutes.delete("/remove-product-variant-by/:id", productVariantController.deleteProductVariant);

module.exports = productVariantRoutes;