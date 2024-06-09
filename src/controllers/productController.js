// const fs = require("fs");
// const { v4: uuidv4 } = require("uuid");
// const path = require("path");
const Response = require("../response");
const database = require('../models');

// get all product with pagination
const getProductByPagination = async (req, res) => {
  try {
    const { product_name, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const whereClause = product_name ? { product_name: { [Op.like]: `%${product_name}%` } } : {};

    const { count, rows: products } = await database.Product.findAndCountAll({
      where: whereClause,
      include: [
        { model: database.Category },
        { model: database.ProductVariant, include: [database.Supplier] },
        {
          model: database.OrderDetail, include: [{ model: database.ProductVariant },
          { model: database.Order, include: [database.Customer, database.Payment] }]
        }
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
      products,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all products
const getProduct = async (req, res) => {
  try {
    const productFiltered = await database.Product.findOne({
      where: { product_id: req?.params?.id },
      include: [
        { model: database.ProductVariant },
        { model: database.OrderDetail, include: [{ model: database.ProductVariant },
          { model: database.Order, include: [database.Customer, database.Payment] }]
        }
      ]
    });
    // const productFiltered = await database.Product.findByPk(req?.params?.id);
    console.log(productFiltered);
    if (productFiltered) {
      new Response(res).setMessage(`Successfully get product by id=${req?.params?.id} with product variants`).setResponse(productFiltered).send();
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

// add new product
const addNewProduct = async (req, res) => {
  try {
    if (req?.body) {
      const { product = null, variants = null } = req?.body;
      const newProduct = await database.Product.create(product, { transaction: transaction });
      for (const detail of variants) {
        detail.product_id = newProduct?.product_id;
        await database.ProductVariant.create(detail, { transaction: transaction });
      }
      await transaction.commit();
      new Response(res).setMessage(`Successfully added product with product varaints`).setResponse(newProduct).send();
    } else {
      new Response(res)
        .setStatusCode(404)
        .setMessage("Wrong format data! product id not found.")
        .send();
    }
  } catch (error) {
    console.log(error);
    new Response(res).setStatusCode(500).setCustomCode(10000).send();
  }
};

// update product
const updateProduct = async (req, res) => {
  try {
    const product = await database.Product.findByPk(req.params.id);
    if (product) {
      await product.update(req.body)
      new Response(res).setMessage(`Successfully added product`).setResponse(product).send();
    } else {
      let message = 'Product not found'
      if (!req?.body) {
        message = 'Wrong format data! It must be the object of product'
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

// delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await database.Product.findByPk(req?.params?.id);
    if (product) {
      await product.destroy();
      new Response(res).setMessage(`Successfully deleted product id=${req?.params?.id}`).setResponse(product).send();
    } else {
      new Response(res)
        .setStatusCode(404)
        .setMessage("Product not found")
        .send();
    }
  } catch (error) {
    console.log(error);
    new Response(res).setStatusCode(500).setCustomCode(10000).send();
  }
};

module.exports = {
  getProductByPagination,
  addNewProduct,
  updateProduct,
  getProduct,
  deleteProduct,
};