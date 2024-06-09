const db = require('./src/models');

db.sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
  process.exit();
});
