'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('categories', 'imageUrl', {
      type: Sequelize.STRING,
      allowNull: true, // Change to `false` if you want this field to be required
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('categories', 'imageUrl');
  }
};
