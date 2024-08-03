const express = require("express");
const supplierRoute = express.Router();

const supplierController = require("../controllers/supplierController");


supplierRoute.get("/suppliers", supplierController.getSupplierByPagination);

supplierRoute.get("/suppliers/:id", supplierController.getSupplier);

supplierRoute.post("/suppliers/add-supplier", supplierController.addNewSupplier);

supplierRoute.put("/suppliers/update-supplier-by/:id", supplierController.updateSupplier);

supplierRoute.delete("/suppliers/remove-supplier-by/:id", supplierController.deleteSupplier);

module.exports = supplierRoute;