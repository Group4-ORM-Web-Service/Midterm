const CommonModel = require("./common");

module.exports = (sequelize, DataTypes) => {
  const OrderDetail = sequelize.define('OrderDetail', {
    orderDetail_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Orders',
        key: 'order_id',
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        key: 'product_id',
      },
    },
    variant_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Product_Variants',
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
    tableName: 'OrderDetails',
  });
  return OrderDetail;
};
