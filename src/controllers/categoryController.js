// const fs = require("fs");
// const { v4: uuidv4 } = require("uuid");
// const path = require("path");
const Response = require("../response");
const database = require('../models');

const getCategoryByPagination = async (req, res) => {
  try {
    const { category_name, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    console.log('getProductOrdersByPagination:::',req.query)
    
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


const getCategory = async (req, res) => {
  try {
    const categoryFiltered = await database.Category.findOne({
      where: { category_id: req?.params?.id },
      include: [
        { model: database.Product, include: [database.ProductVariant] }
      ]
    });
    console.log(categoryFiltered);
    if (categoryFiltered) {
      new Response(res).setMessage(`Success fully get order by id=${req?.params?.id} orders with employee`).setResponse(categoryFiltered).send();
    } else {
      new Response(res)
        .setStatusCode(404)
        .setMessage("Order not found")
        .send();
    }
  } catch (error) {
    console.log(error);
    new Response(res).setStatusCode(500).setCustomCode(10000).send();
  }
};

const addNewCategory = async (req, res) => {
  try {
    if(req?.body){
        const category = await database.Category.create(req.body);
        console.log('category==>', category)
        new Response(res).setMessage(`Success fully added category with employee`).setResponse(category).send();
    }else {
        new Response(res)
        .setStatusCode(404)
        .setMessage("Wrong format data! customer_id not found.")
        .send();
    }
  } catch (error) {
    console.log(error);
    new Response(res).setStatusCode(500).setCustomCode(10000).send();
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await database.Category.findByPk(req.params.id);
    if (category) {
        console.log('res.body==>', req.body)
        await category.update(req.body);
        new Response(res).setMessage(`Success fully added order with employee`).setResponse(category).send();
    } else {
        let message = 'Order not found'
        if(!req?.body){
            message= 'Wrong format data! It must be the object of order'
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

const deleteCategory = async (req, res) => {
  try {
    const category = await database.Category.findByPk(req?.params?.id);
    if (category) {
      await category.destroy();
      new Response(res).setMessage(`Success fully deleted item id=${req?.params?.id}`).setResponse(category).send();
    } else {
      new Response(res)
        .setStatusCode(404)
        .setMessage("Order not found")
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