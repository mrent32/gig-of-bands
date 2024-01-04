const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Gigs extends Model {}

Gigs.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    gig_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: true
    },
    band_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    band_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'bands',
        key: 'id',
      },
    },
    venue_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    venue_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'venues',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'gigs',
  }
);

module.exports = Gigs;
