"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Period extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Period.belongsTo(models.Farm,{foreignKey:'FarmId'})
      Period.hasMany(models.weeklyReport,{foreignKey:'PeriodId'})
    }
  }
  Period.init(
    {
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Start Date Required",
          },
          notEmpty: {
            msg: "Start Date Required",
          },
        },
      },
      endDate: DataTypes.DATE,
      startingDOCNum: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Starting DOC Required",
          },
          notEmpty: {
            msg: "Starting DOC Required",
          },
        },
      },
      FarmId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "FarmId Required",
          },
          notEmpty: {
            msg: "FarmId Required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Period",
    }
  );
  return Period;
};
