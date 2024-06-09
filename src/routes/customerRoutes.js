const express = require("express");
const customerRoute = express.Router();

const customerController = require("../controllers/customerController");


customerRoute.get("", customerController.getCustomerByPagination);

customerRoute.get("/:id", customerController.getCustomer);

customerRoute.post("/add-customer", customerController.addNewCustomer);

customerRoute.put("/update-customer-by/:id", customerController.updateCustomer);

customerRoute.delete("/remove-customer-by/:id", customerController.deleteCustomer);

module.exports = customerRoute;