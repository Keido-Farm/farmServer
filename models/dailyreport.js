'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dailyReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      dailyReport.belongsTo(models.weeklyReport,{foreignKey:'WeeklyReportId'})
      dailyReport.belongsTo(models.User,{foreignKey:'UserId'})
    }
  }
  dailyReport.init({
    FarmId: DataTypes.INTEGER,
    recordDate: DataTypes.DATE,
    mati: DataTypes.INTEGER,
    afkir: DataTypes.INTEGER,
    hidup: DataTypes.INTEGER,
    diberikan: DataTypes.INTEGER,
    sisa: DataTypes.INTEGER,
    dikonsumsi: DataTypes.INTEGER,
    tindakan: DataTypes.TEXT,
    WeeklyReportId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'dailyReport',
  });
  return dailyReport;
};