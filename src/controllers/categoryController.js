const Response = require("../response");
const database = require('../models');

// get all categories with pagination
const getCategoryByPagination = async (req, res) => {
  try {
    const { category_name, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const whereClause = category_name ? { category_name: { [Op.like]: `%${category_name}%` } } : {};

    const { count, rows: categories } = await database.Category.findAndCountAll({
      where: whereClause,
      include: [
        { model: database.Product, include: [database.ProductVariant] }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    const totalPage = Math.ceil(count / limit);

    res.json({
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPage: totalPage,
        hasNext: page < totalPage,
      },
      categories,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all categories
const getCategory = async (req, res) => {
  try {
    const categoryFiltered = await database.Category.findOne({
      where: { category_id: req?.params?.id },
      include: [
        { model: database.Product, include: [database.ProductVariant] }
      ]
    });
    if (categoryFiltered) {
      new Response(res).setMessage(`Successfully get category by id=${req?.params?.id} with prodcuts.`).setResponse(categoryFiltered).send();
    } else {
      new Response(res)
        .setStatusCode(404)
        .setMessage("Category not found")
        .send();
    }
  } catch (error) {
    console.log(error);
    new Response(res).setStatusCode(500).setCustomCode(10000).send();
  }
};

// add new category
const addNewCategory = async (req, res) => {
  try {
    if (req?.body) {
      const category = await database.Category.create(req.body);
      new Response(res).setMessage(`Success fully added category...!`).setResponse(category).send();
    } else {
      new Response(res)
        .setStatusCode(404)
        .setMessage("Wrong format data! category id not found.")
        .send();
    }
  } catch (error) {
    console.log(error);
    new Response(res).setStatusCode(500).setCustomCode(10000).send();
  }
};

// update category
const updateCategory = async (req, res) => {
  try {
    const category = await database.Category.findByPk(req.params.id);
    if (category) {
      await category.update(req.body);
      new Response(res).setMessage(`Successfully added category...!`).setResponse(category).send();
    } else {
      let message = 'Category not found...!'
      if (!req?.body) {
        message = 'Wrong format data! It must be the object of category..!'
      }
      new Response(res)
        .setStatusCode(404)
        .setMessage(message)
        .send();
    }
  } catch (error) {
    console.log(error);
    new Response(res).setStatusCode(500).setCustomCode(10000).send();
  }
};

// delete category
const deleteCategory = async (req, res) => {
  try {
    const category = await database.Category.findByPk(req?.params?.id);
    if (category) {
      await category.destroy();
      new Response(res).setMessage(`Successfully deleted category id=${req?.params?.id}.`).setResponse(category).send();
    } else {
      new Response(res)
        .setStatusCode(404)
        .setMessage("Category not found!")
        .send();
    }
  } catch (error) {
    console.log(error);
    new Response(res).setStatusCode(500).setCustomCode(10000).send();
  }
};

module.exports = {
  getCategoryByPagination,
  addNewCategory,
  updateCategory,
  getCategory,
  deleteCategory,
};