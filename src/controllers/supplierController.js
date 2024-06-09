const Response = require("../response");
const database = require('../models');

// get all supplier with pagination
const getSupplierByPagination = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const { count, rows: suppliers } = await database.Supplier.findAndCountAll({
      include: [
        { model: database.ProductVariant, include: [database.Product] }
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
      suppliers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all supplier
const getSupplier = async (req, res) => {
  try {
    const supplierFiltered = await database.Supplier.findOne({
      where: { supplier_id: req?.params?.id },
      include: [
        { model: database.ProductVariant, include: [database.Product] }
      ]
    });
    if (supplierFiltered) {
      new Response(res).setMessage(`Successfully get supplier by id=${req?.params?.id} with product and pv`).setResponse(supplierFiltered).send();
    } else {
      new Response(res)
        .setStatusCode(404)
        .setMessage("supplier not found")
        .send();
    }
  } catch (error) {
    console.log(error);
    new Response(res).setStatusCode(500).setCustomCode(10000).send();
  }
};

// add new supplier
const addNewSupplier = async (req, res) => {
  try {
    if (req?.body) {
      const supplier = await database.Supplier.create(req.body);
      new Response(res).setMessage(`Successfully added supplier`).setResponse(supplier).send();
    } else {
      new Response(res)
        .setStatusCode(404)
        .setMessage("Wrong format data! supplier id not found.")
        .send();
    }
  } catch (error) {
    console.log(error);
    new Response(res).setStatusCode(500).setCustomCode(10000).send();
  }
};

// update supplier
const updateSupplier = async (req, res) => {
  try {
    const supplier = await database.Supplier.findByPk(req.params.id);
    if (supplier) {
      await supplier.update(req.body)
      new Response(res).setMessage(`Successfully added order`).setResponse(supplier).send();
    } else {
      let message = 'Supplier not found'
      if (!req?.body) {
        message = 'Wrong format data! It must be the object of supplier'
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

// delete supplier
const deleteSupplier = async (req, res) => {
  try {
    const supplier = await database.Supplier.findByPk(req?.params?.id);
    if (supplier) {
      await supplier.destroy();
      new Response(res).setMessage(`Successfully deleted supplier id=${req?.params?.id}`).setResponse(supplier).send();
    } else {
      new Response(res)
        .setStatusCode(404)
        .setMessage("Supplier not found")
        .send();
    }
  } catch (error) {
    console.log(error);
    new Response(res).setStatusCode(500).setCustomCode(10000).send();
  }
};

module.exports = {
  getSupplierByPagination,
  addNewSupplier,
  updateSupplier,
  getSupplier,
  deleteSupplier,
};