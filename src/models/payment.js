const CommonModel = require("./common");

module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('payment', {
    payment_id: {
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
    payment_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    ...CommonModel
  }, {
    tableName: 'payments',
  });
  return Payment;
};
