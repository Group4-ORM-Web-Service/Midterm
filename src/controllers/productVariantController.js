// const fs = require("fs");
// const { v4: uuidv4 } = require("uuid");
// const path = require("path");
const Response = require("../response");
const database = require('../models');

const getProductVariantByPagination = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    console.log('getProductOrdersByPagination:::',req.query)
    
    const { count, rows: productVariants } = await database.ProductVariant.findAndCountAll({
    //   where: {},
    //   include: [database.ProductVariant],
      include: [
        database.Supplier,
        { model: database.Product, include: [database.OrderDetail] }
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
      productVariants,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getProductVariant = async (req, res) => {
  try {
    const productVariantFiltered = await database.ProductVariant.findOne({
        where: { variant_id: req?.params?.id },
        include: [
        { model: database.Supplier},
        { model: database.Product, include: [{model: database.OrderDetail, include: [
          {model: database.Order, include: [database.Customer, database.Payment]}
        ]}] }
        ]
    });
    console.log(productVariantFiltered);
    if (productVariantFiltered) {
      new Response(res).setMessage(`Success fully get order by id=${req?.params?.id} orders with employee`).setResponse(productVariantFiltered).send();
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

const addNewProductVariant = async (req, res) => {
  try {
    if(req?.body){
        const productVaraint = await database.ProductVariant.create(req.body);
        new Response(res).setMessage(`Success fully added productVaraint with employee`).setResponse(productVaraint).send();
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

const updateProductVariant= async (req, res) => {
  try {
    const productVariant = await database.ProductVariant.findByPk(req.params.id);
    if (productVariant) {
        await productVariant.update(req.body)
      new Response(res).setMessage(`Success fully added order with employee`).setResponse(productVariant).send();
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

const deleteProductVariant = async (req, res) => {
  try {
    const productVariant = await database.ProductVariant.findByPk(req?.params?.id);
    if (productVariant) {
        await productVariant.destroy();
      new Response(res).setMessage(`Success fully deleted item id=${req?.params?.id}`).setResponse(productVariant).send();
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
getProductVariantByPagination,
addNewProductVariant,
updateProductVariant,
getProductVariant,
deleteProductVariant,
};