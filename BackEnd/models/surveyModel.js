const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Survey = sequelize.define('Survey', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_sale: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Sales', key: 'id'}
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  comments: {
    type: DataTypes.STRING,
    allowNull: false
  },
  recommend: {
    type: DataTypes.STRING
  },
  appscore: {
    type: DataTypes.INTEGER
  },
  image: {
    type: DataTypes.STRING 
  }
});

module.exports = Survey;