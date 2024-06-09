const { Sequelize, DataTypes, Op } = require('sequelize');

// const sequelize = new Sequelize('product-management', 'postgres', 'realwat2007', {
//   host: '127.0.0.1',
//   dialect: 'postgres',
// });

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite', // You can specify the path to your SQLite file here
  logging: false,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Op = Op;

db.Category = require('./category')(sequelize, DataTypes);
db.Product = require('./product')(sequelize, DataTypes);
db.ProductVariant = require('./productVariant')(sequelize, DataTypes);
db.Order = require('./order')(sequelize, DataTypes);
db.OrderDetail = require('./orderDetail')(sequelize, DataTypes);
db.Customer = require('./customer')(sequelize, DataTypes);
db.Payment = require('./payment')(sequelize, DataTypes);
db.Supplier = require('./supplier')(sequelize, DataTypes);

// Define associations
db.Category.hasMany(db.Product, { foreignKey: 'category_id' });
db.Product.belongsTo(db.Category, { foreignKey: 'category_id' });

db.Product.hasMany(db.ProductVariant, { foreignKey: 'product_id' });
db.ProductVariant.belongsTo(db.Product, { foreignKey: 'product_id' });

db.Supplier.hasMany(db.ProductVariant, { foreignKey: 'supplier_id' });
db.ProductVariant.belongsTo(db.Supplier, { foreignKey: 'supplier_id' });

db.Customer.hasMany(db.Order, { foreignKey: 'customer_id' });
db.Order.belongsTo(db.Customer, { foreignKey: 'customer_id' });

db.Order.hasMany(db.OrderDetail, { foreignKey: 'order_id' });
db.OrderDetail.belongsTo(db.Order, { foreignKey: 'order_id' });

db.Product.hasMany(db.OrderDetail, { foreignKey: 'product_id' });
db.OrderDetail.belongsTo(db.Product, { foreignKey: 'product_id' });

db.ProductVariant.hasMany(db.OrderDetail, { foreignKey: 'variant_id' });
db.OrderDetail.belongsTo(db.ProductVariant, { foreignKey: 'variant_id' });

db.Order.hasOne(db.Payment, { foreignKey: 'order_id' });
db.Payment.belongsTo(db.Order, { foreignKey: 'order_id' });

module.exports = db;
