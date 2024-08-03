const CommonModel = require("./common");

module.exports = (sequelize, DataTypes) => {
  const ProductVariant = sequelize.define('productVariant', {
    variant_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'products',
        key: 'product_id',
      },
    },
    supplier_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'suppliers',
        key: 'supplier_id',
      },
    },
    product_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
    },
    color: {
      type: DataTypes.STRING,
    },
    sku: {
      type: DataTypes.STRING,
    },
    barcode: {
      type: DataTypes.STRING,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ...CommonModel
  }, {
    tableName: 'product_Variants',
  });
  return ProductVariant;
};
