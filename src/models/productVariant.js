const CommonModel = require("./common");

module.exports = (sequelize, DataTypes) => {
  const ProductVariant = sequelize.define('ProductVariant', {
    variant_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        key: 'product_id',
      },
    },
    supplier_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Suppliers',
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
    ...CommonModel
  }, {
    tableName: 'Product_Variants',
  });
  return ProductVariant;
};
