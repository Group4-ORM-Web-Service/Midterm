const CommonModel = require("./common");

module.exports = (sequelize, DataTypes) => {
  const OrderDetail = sequelize.define('orderDetail', {
    orderDetail_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'orders',
        key: 'order_id',
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'products',
        key: 'product_id',
      },
    },
    variant_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product_Variants',
        key: 'variant_id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    ...CommonModel
  }, {
    tableName: 'orderDetails',
  });
  return OrderDetail;
};
