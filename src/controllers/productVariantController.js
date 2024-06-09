const Response = require("../response");
const database = require('../models');

// get product variant with pagination
const getProductVariantByPagination = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const { count, rows: productVariants } = await database.ProductVariant.findAndCountAll({
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

// get all product variants
const getProductVariant = async (req, res) => {
  try {
    const productVariantFiltered = await database.ProductVariant.findOne({
      where: { variant_id: req?.params?.id },
      include: [
        { model: database.Supplier },
        {
          model: database.Product, include: [{
            model: database.OrderDetail, include: [
              { model: database.Order, include: [database.Customer, database.Payment] }
            ]
          }]
        }
      ]
    });
    if (productVariantFiltered) {
      new Response(res).setMessage(`Successfully get product variant by id=${req?.params?.id} with product`).setResponse(productVariantFiltered).send();
    } else {
      new Response(res)
        .setStatusCode(404)
        .setMessage("Product variant not found")
        .send();
    }
  } catch (error) {
    console.log(error);
    new Response(res).setStatusCode(500).setCustomCode(10000).send();
  }
};

// add new product variant
const addNewProductVariant = async (req, res) => {
  try {
    if (req?.body) {
      const productVaraint = await database.ProductVariant.create(req.body);
      new Response(res).setMessage(`Successfully added productVaraint`).setResponse(productVaraint).send();
    } else {
      new Response(res)
        .setStatusCode(404)
        .setMessage("Wrong format data! product variant id not found.")
        .send();
    }
  } catch (error) {
    console.log(error);
    new Response(res).setStatusCode(500).setCustomCode(10000).send();
  }
};

// update product variant
const updateProductVariant = async (req, res) => {
  try {
    const productVariant = await database.ProductVariant.findByPk(req.params.id);
    if (productVariant) {
      await productVariant.update(req.body)
      new Response(res).setMessage(`Successfully added product variant`).setResponse(productVariant).send();
    } else {
      let message = 'Product variant not found'
      if (!req?.body) {
        message = 'Wrong format data! It must be the object of product variant'
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

// delete product variant
const deleteProductVariant = async (req, res) => {
  try {
    const productVariant = await database.ProductVariant.findByPk(req?.params?.id);
    if (productVariant) {
      await productVariant.destroy();
      new Response(res).setMessage(`Successfully deleted product varaint id=${req?.params?.id}`).setResponse(productVariant).send();
    } else {
      new Response(res)
        .setStatusCode(404)
        .setMessage("Product varaint not found")
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