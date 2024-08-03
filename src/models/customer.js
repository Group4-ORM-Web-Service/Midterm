const CommonModel = require("./common");

module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('customer', {
    customer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    ...CommonModel
  }, {
    tableName: 'customers',
  });
  return Customer;
};
