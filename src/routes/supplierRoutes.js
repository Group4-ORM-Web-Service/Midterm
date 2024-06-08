const express = require("express");
const supplierRoute = express.Router();

const supplierController = require("../controllers/supplierController");


supplierRoute.get("", supplierController.getSupplierByPagination);

supplierRoute.get("/:id", supplierController.getSupplier);

supplierRoute.post("/add-supplier", supplierController.addNewSupplier);

supplierRoute.put("/update-supplier-by/:id", supplierController.updateSupplier);

supplierRoute.delete("/remove-supplier-by/:id", supplierController.deleteSupplier);

module.exports = supplierRoute;