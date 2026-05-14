const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SalesItems = sequelize.define('SalesItems', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  unit_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
});

module.exports = SalesItems;