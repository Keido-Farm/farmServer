'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('weeklyReports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      startingDate: {
        type: Sequelize.DATE
      },
      endDate: {
        type: Sequelize.DATE
      },
      jumlahAyam: {
        type: Sequelize.INTEGER
      },
      feedIntake: {
        type: Sequelize.INTEGER
      },
      mortalitas: {
        type: Sequelize.INTEGER
      },
      deplesi: {
        type: Sequelize.INTEGER
      },
      beratBadan: {
        type: Sequelize.INTEGER
      },
      comment: {
        type: Sequelize.TEXT
      },
      PeriodId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Periods',
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
    await queryInterface.dropTable('weeklyReports');
  }
};