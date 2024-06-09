const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const Response = require("../response");
const database = require('../models');

// get all products with pagination
const getProductOrdersByPagination = async (req, res) => {
  try {
    const { date, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const whereClause = date ? { order_date: { [Op.like]: `%${date}%` } } : {};

    const { count, rows: orders } = await database.Order.findAndCountAll({
      where: whereClause,
      include: [
        { model: database.Customer },
        { model: database.Payment },
        {
          model: database.OrderDetail, include: [{
            model: database.ProductVariant,
            include: [{ model: database.Product, include: [database.Category] },
            { model: database.Supplier }]
          }]
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
      orders,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all products
const getProductOrder = async (req, res) => {
  try {
    const orderFiltered = await database.Order.findOne({
      where: { order_id: req?.params?.id },
      include: [
        { model: database.Customer },
        { model: database.Payment },
        {
          model: database.OrderDetail, include: [{
            model: database.ProductVariant,
            include: [{ model: database.Product, include: [database.Category] },
            { model: database.Supplier }]
          }]
        }
      ],
    });
    if (orderFiltered) {
      new Response(res).setMessage(`Successfully get order by id=${req?.params?.id} with order detail, customer and payment.`).setResponse(orderFiltered).send();
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

// create new order
const addNewProductOrder = async (req, res) => {
  try {
    if (req?.body) {
      const { order = null, orderDetails = null } = req?.body;
      const newOrder = await database.Order.create(order, { transaction: transaction });
      for (const detail of orderDetails) {
        detail.order_id = newOrder?.order_id;
        await database.OrderDetail.create(detail, { transaction: transaction });
      }
      await transaction.commit();
      new Response(res).setMessage(`Successfully added order with order details`).setResponse(newOrder).send();
    } else {
      new Response(res)
        .setStatusCode(404)
        .setMessage("Wrong format data! order id not found.")
        .send();
    }
  } catch (error) {
    console.log(error);
    new Response(res).setStatusCode(500).setCustomCode(10000).send();
  }
};

const addManyProductOrders = (req, res) => {
 try {
    const orders = readData(filePath);
    const data = req?.body;
    if (Array.isArray(data)) {
      const lOrders = data?.map((item) => ({
        id: uuidv4(),
        customer_id: item?.customer_id || null,
        date: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));
      orders.push(...lOrders);
      writeData(filePath, orders);
      new Response(res).setMessage(`Success fully added orders with employee`).setResponse(lOrders).send();
    }else {
        new Response(res)
        .setStatusCode(404)
        .setMessage("Wrong format data! data must be the array of object.")
        .send();
    }
  } catch (error) {
    console.log(error);
    new Response(res).setStatusCode(500).setCustomCode(10000).send();
  }
};

// update order
const updateProductOrder = async (req, res) => {
  try {
    // const orders = readData(filePath);
    // const index = orders?.findIndex((a) => a?.id === req?.params?.id);
    const order = await database.Order.findByPk(req.params.id);
    if (order && req?.body) {
      // orders[index] = {
      //   ...orders[index],
      //   customer_id : req?.body?.customer_id || null,
      //   updated_at: new Date().toISOString(),
      // };
      // writeData(filePath, orders);
      await order.update(req.body);
      new Response(res).setMessage(`Success fully added order with order details`).setResponse(order).send();
    } else {
      let message = 'Order not found'
      if (!req?.body) {
        message = 'Wrong format data! It must be the object of order'
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

// delete order
const deleteProductOrder = async (req, res) => {
  try {
    // let orders = readData(filePath);
    // const index = orders?.findIndex((a) => a?.id === req?.params?.id);
    const order = await database.Order.findByPk(req?.params?.id);
    if (order) {
      // const itemDeleted = orders[index];
      // orders = orders?.filter((a) => a?.id !== req?.params?.id);
      // writeData(filePath, orders);
      await order.destroy();
      new Response(res).setMessage(`Success fully deleted order id=${req?.params?.id}.`).setResponse(order).send();
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
  getProductOrdersByPagination,
  addNewProductOrder,
  updateProductOrder,
  getProductOrder,
  deleteProductOrder,
};