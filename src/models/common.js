// models/common.js

const { DataTypes } = require('sequelize');
const CommonModel = {
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
};

module.exports = CommonModel;
