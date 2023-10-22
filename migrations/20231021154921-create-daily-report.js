'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('dailyReports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      FarmId: {
        type: Sequelize.INTEGER
      },
      recordDate: {
        type: Sequelize.DATE
      },
      mati: {
        type: Sequelize.INTEGER
      },
      afkir: {
        type: Sequelize.INTEGER
      },
      hidup: {
        type: Sequelize.INTEGER
      },
      diberikan: {
        type: Sequelize.INTEGER
      },
      sisa: {
        type: Sequelize.INTEGER
      },
      dikonsumsi: {
        type: Sequelize.INTEGER
      },
      tindakan: {
        type: Sequelize.TEXT
      },
      WeeklyReportId: {
        type: Sequelize.INTEGER,
        references:{
          model:'weeklyReports',
          key:'id'
        },
        allowNull:false
      },
      UserId:{
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
    await queryInterface.dropTable('dailyReports');
  }
};