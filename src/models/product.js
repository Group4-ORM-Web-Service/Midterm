const CommonModel = require("./common");

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'categories',
        key: 'category_id',
      },
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ...CommonModel
  }, {
    tableName: 'products',
  });
  return Product;
};
