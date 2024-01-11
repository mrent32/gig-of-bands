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
    band_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'bands',
        key: 'id',
      },
    },
    venue_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
