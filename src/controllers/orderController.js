const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const Response = require("../response");
const database = require('../models');


const filePath = path.join(__dirname, "../data/orders.json");

// Helper functions to read and write JSON files
const readData = (file) => {
  const data = fs.readFileSync(file);
  return JSON.parse(data);
};

const writeData = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};


// const getProductOrdersByPagination = (req, res) => {
//   // Pagination
//   let orders = readData(filePath);
//   // Advanced search
//   const { date, page = 1, limit = 10 } = req?.query;
//   if (date) {
//     orders = orders?.filter((order) =>
//       order?.date?.includes(date),
//     );
//   }

//   // Pagination
//   const startIndex = (page - 1) * limit;
//   const endIndex = startIndex + parseInt(limit);

//   const paginatedProductOrders = orders?.slice(startIndex, endIndex);

//   res.json({
//     pagination: {
//       total: orders?.length || 0,
//       page: parseInt(page),
//       limit: parseInt(limit),
//       totalPage: Math.ceil(orders?.length / limit),
//       hasNext: endIndex < orders?.length,
//     },
//     orders: paginatedProductOrders || [],
//   });
//   return res.send(orders);
// };
const getProductOrdersByPagination = async (req, res) => {
  try {
    const { date, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    console.log('getProductOrdersByPagination:::',req.query)
    
    const whereClause = date ? { order_date: { [Op.like]: `%${date}%` } } : {};

    const { count, rows: orders } = await database.Order.findAndCountAll({
      where: whereClause,
      include: [
        database.Customer, 
        { model: database.OrderDetail, include: [database.Product, database.ProductVariant] }
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


const getProductOrder = async (req, res) => {
  try {
    // const orders = readData(filePath);
    // const orderFiltered = orders?.find((a) => a?.id === req?.params?.id);
    const orderFiltered = await database.Order.findByPk(req?.params?.id);
    console.log(orderFiltered);
    if (orderFiltered) {
      new Response(res).setMessage(`Success fully get order by id=${req?.params?.id} orders with employee`).setResponse(orderFiltered).send();
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

const addNewProductOrder = async (req, res) => {
  try {
    // const productOrders = readData(filePath);
    if(req?.body){
        // const newOrder = {
        // id: uuidv4(),
        // customer_id: req?.body?.customer_id || null,
        // date: new Date().toISOString(),
        // created_at: new Date().toISOString(),
        // updated_at: new Date().toISOString(),
        // };
        const order = await database.Order.create(req.body, { include: [database.OrderDetail] });
        // productOrders?.push(newOrder);
        // writeData(filePath, productOrders);
        new Response(res).setMessage(`Success fully added order with employee`).setResponse(order).send();
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
      new Response(res).setMessage(`Success fully added order with employee`).setResponse(order).send();
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
      new Response(res).setMessage(`Success fully deleted item id=${req?.params?.id}`).setResponse(order).send();
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
addManyProductOrders,
};