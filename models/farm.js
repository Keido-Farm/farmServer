'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Farm extends Model {
    static associate(models) {
      Farm.belongsTo(models.User, { foreignKey: 'UserId' });
    }
  }

  Farm.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Name Required',
          },
          notEmpty: {
            msg: 'Name Required',
          },
        },
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Category Required',
          },
          notEmpty: {
            msg: 'Category Required',
          },
        },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Location Required',
          },
          notEmpty: {
            msg: 'Location Required',
          },
        },
      },
      abk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'ABK Required',
          },
          notEmpty: {
            msg: 'ABK Required',
          },
        },
      },
      strain: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Strain Required',
          },
          notEmpty: {
            msg: 'Strain Required',
          },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Image URL Required',
          },
          notEmpty: {
            msg: 'Image URL Required',
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'UserId Required',
          },
          notEmpty: {
            msg: 'UserId Required',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Farm',
    }
  );

  return Farm;
};
