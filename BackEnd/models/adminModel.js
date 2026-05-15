const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Admin = sequelize.define('Admin', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false},
  email: {
    type: DataTypes.STRING,
    allowNull: false},
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Admin;