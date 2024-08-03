const express = require("express");
const customerRoute = express.Router();

const customerController = require("../controllers/customerController");


customerRoute.get("/customers", customerController.getCustomerByPagination);

customerRoute.get("/customers/:id", customerController.getCustomer);

customerRoute.post("/customers/add-customer", customerController.addNewCustomer);

customerRoute.put("/customers/update-customer-by/:id", customerController.updateCustomer);

customerRoute.delete("/customers/remove-customer-by/:id", customerController.deleteCustomer);

module.exports = customerRoute;