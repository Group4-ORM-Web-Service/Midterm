// const fs = require("fs");
// const { v4: uuidv4 } = require("uuid");
// const path = require("path");
const Response = require("../response");
const database = require('../models');

const getPaymentByPagination = async (req, res) => {
  try {
    const {page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    // const whereClause = payment_date ? { payment_date: { [Op.like]: `%${payment_date}%` } } : {};
    const { count, rows: payments } = await database.Payment.findAndCountAll({
    // where: whereClause,
      include: [
       { model: database.Order}
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
      payments,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getPaymentById = async (req, res) => {
  try {
    const paymentFiltered = await database.Payment.findOne({
      where: { payment_id: req?.params?.id },
      include: [
       { model: database.Order},
      ]
    });
    if (paymentFiltered) {
      new Response(res).setMessage(`Success fully get payment by id=${req?.params?.id} payments with order`).setResponse(paymentFiltered).send();
    } else {
      new Response(res)
        .setStatusCode(404)
        .setMessage("Payment not found")
        .send();
    }
  } catch (error) {
    console.log(error);
    new Response(res).setStatusCode(500).setCustomCode(10000).send();
  }
};

const addNewPayment = async (req, res) => {
  try {
    if(req?.body){
        const payment = await database.Payment.create(req.body);
        new Response(res).setMessage(`Success fully added payment with order`).setResponse(payment).send();
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

const updatePayment= async (req, res) => {
  try {
    const payment = await database.Payment.findByPk(req.params.id);
    if (payment) {
        await payment.update(req.body)
      new Response(res).setMessage(`Success fully updated payment with order`).setResponse(payment).send();
    } else {
        let message = 'Payment not found'
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

const deletePayment = async (req, res) => {
  try {
    const payment = await database.Payment.findByPk(req?.params?.id);
    if (payment) {
        await payment.destroy();
      new Response(res).setMessage(`Success fully deleted item id=${req?.params?.id}`).setResponse(payment).send();
    } else {
      new Response(res)
        .setStatusCode(404)
        .setMessage("Payment not found")
        .send();
    }
  } catch (error) {
    console.log(error);
    new Response(res).setStatusCode(500).setCustomCode(10000).send();
  }
};

module.exports = {
    getPaymentByPagination,
    addNewPayment,
    updatePayment,
    getPaymentById,
    deletePayment
};