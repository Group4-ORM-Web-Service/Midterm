// const fs = require("fs");
// const { v4: uuidv4 } = require("uuid");
// const path = require("path");
const Response = require("../response");
const database = require('../models');

const getCustomerByPagination = async (req, res) => {
  try {
    const { name, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    console.log('getProductOrdersByPagination:::',req.query)
    
    const whereClause = name ? { name: { [Op.like]: `%${name}%` } } : {};

    const { count, rows: customers } = await database.Customer.findAndCountAll({
      where: whereClause,
       include: [
        { model: database.Order, include: [database.OrderDetail, database.Payment] }
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
      customers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getCustomer = async (req, res) => {
  try {
    const customerFiltered = await database.Customer.findOne({
        where: { customer_id: req?.params?.id },
        include: [
            { model: database.Order, include: [
                { model: database.OrderDetail, include: [
                    database.Product,
                    { model: database.ProductVariant }
                ]}
            ]}
        ]
    });
    console.log(customerFiltered);
    if (customerFiltered) {
      new Response(res).setMessage(`Success fully get order by id=${req?.params?.id} orders with employee`).setResponse(customerFiltered).send();
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

const addNewCustomer = async (req, res) => {
  try {
    if(req?.body){
        const customer = await database.Customer.create(req.body);
        new Response(res).setMessage(`Success fully added  customer with employee`).setResponse(customer).send();
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

const updateCustomer = async (req, res) => {
  try {
    const customer = await database.Customer.findByPk(req.params.id);
    if (customer) {
      await customer.update(req?.body);
      new Response(res).setMessage(`Success fully added order with employee`).setResponse(customer).send();
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

const deleteCustomer = async (req, res) => {
  try {
    const customer = await database.Customer.findByPk(req?.params?.id);
    if (customer) {
      await customer.destroy();
      new Response(res).setMessage(`Success fully deleted item id=${req?.params?.id}`).setResponse(customer).send();
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
getCustomerByPagination,
addNewCustomer,
updateCustomer,
getCustomer,
deleteCustomer,
};