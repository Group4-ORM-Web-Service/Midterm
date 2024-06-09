const Response = require("../response");
const database = require('../models');

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


const getSupplier = async (req, res) => {
  try {
    const supplierFiltered = await database.Supplier.findOne({
        where: { supplier_id: req?.params?.id },
        include: [
          { model: database.ProductVariant, include: [database.Product] }
        ]
    });
    console.log(supplierFiltered);
    if (supplierFiltered) {
      new Response(res).setMessage(`Success fully get order by id=${req?.params?.id} orders with employee`).setResponse(supplierFiltered).send();
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

const addNewSupplier = async (req, res) => {
  try {
    console.log('req?.body==>', req?.body)
    if(req?.body){
        const supplier = await database.Supplier.create(req.body);
        new Response(res).setMessage(`Success fully added supplier with employee`).setResponse(supplier).send();
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

const updateSupplier= async (req, res) => {
  try {
    const supplier = await database.Supplier.findByPk(req.params.id);
    if (supplier) {
        await supplier.update(req.body)
      new Response(res).setMessage(`Success fully added order with employee`).setResponse(supplier).send();
    } else {
        let message = 'supplier not found'
        if(!req?.body){
            message= 'Wrong format data! It must be the object of supplier'
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

const deleteSupplier = async (req, res) => {
  try {
    const supplier = await database.Supplier.findByPk(req?.params?.id);
    if (supplier) {
        await supplier.destroy();
      new Response(res).setMessage(`Success fully deleted item id=${req?.params?.id}`).setResponse(supplier).send();
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
getSupplierByPagination,
addNewSupplier,
updateSupplier,
getSupplier,
deleteSupplier,
};