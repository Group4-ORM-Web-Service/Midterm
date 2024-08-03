const CommonModel = require("./common");

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('category', {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    ...CommonModel
  }, {
    tableName: 'categories',
  });
  return Category;
};
