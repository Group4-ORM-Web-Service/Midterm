const CommonModel = require("./common");

// models/order.js
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'customers',
        key: 'customer_id',
      },
    },
    order_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW 
    },
    ...CommonModel
  }, {
    tableName: 'orders',
  });
  return Order;
};
