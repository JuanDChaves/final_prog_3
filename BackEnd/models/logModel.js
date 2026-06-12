const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Log = sequelize.define('Log', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_admin: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Admins', key: 'id' }
  }
});

module.exports = Log;