const express = require("express");
const productVariantRoutes = express.Router();

const productVariantController = require("../controllers/productVariantController");


productVariantRoutes.get("/product-variants", productVariantController.getProductVariantByPagination);

productVariantRoutes.get("/product-variants/:id", productVariantController.getProductVariant);

productVariantRoutes.post("/product-variants/add-product-variant", productVariantController.addNewProductVariant);

productVariantRoutes.put("/product-variants/update-product-variant-by/:id", productVariantController.updateProductVariant);

productVariantRoutes.delete("/product-variants/remove-product-variant-by/:id", productVariantController.deleteProductVariant);

module.exports = productVariantRoutes;