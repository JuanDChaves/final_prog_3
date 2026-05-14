const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Carts = sequelize.define('Carts', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
});

module.exports = Carts;