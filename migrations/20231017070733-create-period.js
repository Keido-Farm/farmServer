'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Periods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull:false
      },
      endDate: {
        type: Sequelize.DATE
      },
      startingDOCNum: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'active', 
        validate: {
          notNull: {
            msg: "Status Required",
          },
          notEmpty: {
            msg: "Status Required",
          },
        },
      },
      FarmId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Farms',
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
    await queryInterface.dropTable('Periods');
  }
};