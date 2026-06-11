const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Survey = sequelize.define('Survey', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
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