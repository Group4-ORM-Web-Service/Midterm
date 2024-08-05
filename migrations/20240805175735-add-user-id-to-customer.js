'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Customers', 'user_id', {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users', // Name of the target table
        key: 'user_id', // Key in the target table that we're referencing
      },
      onDelete: 'CASCADE', // If a user is deleted, remove associated customer
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Customers', 'user_id');
  }
};
