'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class weeklyReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      weeklyReport.belongsTo(models.Period,{foreignKey:'PeriodId'})
      weeklyReport.hasMany(models.dailyReport,{foreignKey:'WeeklyReportId'})
    }
  }
  weeklyReport.init({
    startingDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    jumlahAyamAwal: DataTypes.INTEGER,
    jumlahAyamAkhir: DataTypes.INTEGER,
    feedIntake: DataTypes.INTEGER,
    mortalitas: DataTypes.INTEGER,
    deplesi: DataTypes.INTEGER,
    beratBadan: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    PeriodId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'weeklyReport',
  });
  return weeklyReport;
};