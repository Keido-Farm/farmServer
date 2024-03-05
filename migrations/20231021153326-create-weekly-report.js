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
      jumlahAyamAwal: {
        type: Sequelize.INTEGER
      },
      jumlahAyamAkhir:{
        type: Sequelize.INTEGER
      },
      feedIntake: {
        type: Sequelize.FLOAT
      },
      mortalitas: {
        type: Sequelize.FLOAT
      },
      deplesi: {
        type: Sequelize.FLOAT
      },
      beratBadan: {
        type: Sequelize.FLOAT
      },
      ksrgmnBB: {
        type: Sequelize.FLOAT
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