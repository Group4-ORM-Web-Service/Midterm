const { Sequelize, DataTypes, Op } = require('sequelize');

// CONNECT TO DATABASE WITH POSTGRESQL===================================================
// const sequelize = new Sequelize('shop_card_api', 'postgres', 'realwat2007', {
//   host: '127.0.0.1',
//   dialect: 'postgres',
// });

// CONNECT TO DATABASE WITH MYSQL===============================================
// const sequelize = new Sequelize('shop_card_api', 'username', 'password', {
//   host: 'localhost',
//   dialect: 'mysql',
//   logging: false, // Optional: Set to `true` to enable SQL query logging
//   dialectOptions: {
//     // Optional: Configure additional options for MySQL
//     // Use the following if you face timezone issues
//     // timezone: 'Z'
//   },
// });

// CONNECT TO DATABASE WITH SQLITE===============================================
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database2.sqlite', // You can specify the path to your SQLite file here
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
db.User = require('./user')(sequelize, DataTypes);

// Define associations with onDelete: 'CASCADE'
db.User.hasOne(db.Customer, { foreignKey: 'customer_id', onDelete: 'CASCADE' })
db.Customer.belongsTo(db.User, { foreignKey: 'customer_id', onDelete: 'CASCADE' });

db.Category.hasMany(db.Product, { foreignKey: 'category_id', onDelete: 'CASCADE' });
db.Product.belongsTo(db.Category, { foreignKey: 'category_id', onDelete: 'CASCADE' });

db.Product.hasMany(db.ProductVariant, { foreignKey: 'product_id', onDelete: 'CASCADE' });
db.ProductVariant.belongsTo(db.Product, { foreignKey: 'product_id', onDelete: 'CASCADE' });

db.Supplier.hasMany(db.ProductVariant, { foreignKey: 'supplier_id', onDelete: 'CASCADE' });
db.ProductVariant.belongsTo(db.Supplier, { foreignKey: 'supplier_id', onDelete: 'CASCADE' });

db.Customer.hasMany(db.Order, { foreignKey: 'customer_id', onDelete: 'CASCADE' });
db.Order.belongsTo(db.Customer, { foreignKey: 'customer_id', onDelete: 'CASCADE' });

db.Order.hasMany(db.OrderDetail, { foreignKey: 'order_id', onDelete: 'CASCADE' });
db.OrderDetail.belongsTo(db.Order, { foreignKey: 'order_id', onDelete: 'CASCADE' });

db.Product.hasMany(db.OrderDetail, { foreignKey: 'product_id', onDelete: 'CASCADE' });
db.OrderDetail.belongsTo(db.Product, { foreignKey: 'product_id', onDelete: 'CASCADE' });

db.ProductVariant.hasMany(db.OrderDetail, { foreignKey: 'variant_id', onDelete: 'CASCADE' });
db.OrderDetail.belongsTo(db.ProductVariant, { foreignKey: 'variant_id', onDelete: 'CASCADE' });

db.Order.hasOne(db.Payment, { foreignKey: 'order_id', onDelete: 'CASCADE' });
db.Payment.belongsTo(db.Order, { foreignKey: 'order_id', onDelete: 'CASCADE' });

module.exports = db;
