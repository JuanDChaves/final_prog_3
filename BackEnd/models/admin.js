const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Admin = sequelize.define('Admin', {
  name: {
    type: DataTypes.STRING,
    allowNull: false},
  email: {
    type: DataTypes.STRING,
    allowNull: false}
});

module.exports = Admin;