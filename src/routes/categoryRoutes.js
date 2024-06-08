const express = require("express");
const categoryRoute = express.Router();

const categoryController = require("../controllers/categoryController");


categoryRoute.get("", categoryController.getCategoryByPagination);

categoryRoute.get("/:id", categoryController.getCategory);

categoryRoute.post("/add-category", categoryController.addNewCategory);

categoryRoute.put("/update-category-by/:id", categoryController.updateCategory);

categoryRoute.delete("/remove-category-by/:id", categoryController.deleteCategory);

module.exports = categoryRoute;