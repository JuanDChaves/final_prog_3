const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SaleItem = sequelize.define('SaleItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_sale: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Sale', key: 'id' }
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Product', key: 'id' }
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

module.exports = SaleItem;