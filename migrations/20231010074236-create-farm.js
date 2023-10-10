'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Farms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      category: {
        type: Sequelize.STRING,
        allowNull:false
      },
      location: {
        type: Sequelize.STRING,
        allowNull:false
      },
      abk: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      strain: {
        type: Sequelize.STRING,
        allowNull:false
      },
      imgUrl: {
        type: Sequelize.STRING,
        allowNull:false
      },
      UserId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Users',
          key:'id'
        },
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Farms');
  }
};