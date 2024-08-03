const express = require("express");
const categoryRoute = express.Router();

const categoryController = require("../controllers/categoryController");


categoryRoute.get("/categories", categoryController.getCategoryByPagination);

categoryRoute.get("/categories/:id", categoryController.getCategory);

categoryRoute.post("/categories/add-category", categoryController.addNewCategory);

categoryRoute.put("/categories/update-category-by/:id", categoryController.updateCategory);

categoryRoute.delete("/categories/remove-category-by/:id", categoryController.deleteCategory);

module.exports = categoryRoute;