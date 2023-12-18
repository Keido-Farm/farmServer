'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GrowerStandard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GrowerStandard.init({
    umur: DataTypes.STRING,
    strain: DataTypes.STRING,
    feedIntake: DataTypes.STRING,
    beratBadan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'GrowerStandard',
  });
  return GrowerStandard;
};