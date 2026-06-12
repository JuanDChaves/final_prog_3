const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const { Op } = require('sequelize');

const SaleItem = require('../models/saleItemModel');
const Sale = require('../models/saleModel');
const Product = require('../models/productModel');
const Survey = require('../models/surveyModel');
const Log = require('../models/logModel');
const Admin = require('../models/adminModel');

const getMostPurchased = async (req, res) => {
  try {
    const result = await SaleItem.findAll({
      attributes: [
        'id_product',
        [sequelize.fn('SUM', sequelize.col('SaleItem.quantity')), 'total_sold']
      ],
      include: [{
        model: Product,
        attributes: ['name', 'type']
      }],
      group: ['SaleItem.id_product', 'Product.id', 'Product.name', 'Product.type'],
      order: [[sequelize.literal('total_sold'), 'DESC']],
      limit: 10
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMostExpensiveProducts = async (req, res) => {
  try {
    const result = await Product.findAll({
      attributes: ['name', 'type', 'price'],
      where: { active: true },
      order: [['price', 'DESC']],
      limit: 10
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMostFrequentProductQuantity = async (req, res) => {
  try {
    const result = await SaleItem.findAll({
      attributes: [
        'quantity',
        [sequelize.fn('COUNT', sequelize.col('quantity')), 'frequency']
      ],
      group: ['quantity'],
      order: [[sequelize.literal('frequency'), 'DESC']],
      limit: 3
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllSales = async (req, res) => {
  try {
    const result = await Sale.findAll({
      attributes: ['id', 'total_price', 'status', 'createdAt'],
      order: [['createdAt', 'DESC']]
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMostExpensiveSales = async (req, res) => {
  try {
    const result = await Sale.findAll({
      attributes: ['id', 'total_price', 'status', 'createdAt'],
      order: [['total_price', 'DESC']],
      limit: 10
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMostLikedProducts = async (req, res) => {
  try {
    const result = await SaleItem.findAll({
      attributes: [
        'id_product',
        [sequelize.fn('AVG', sequelize.col('Sale.Survey.appscore')), 'avg_score']
      ],
      include: [
        {
          model: Sale,
          attributes: [],
          include: [
            {
              model: Survey,
              attributes: [],
            }
          ]
        },
        {
          model: Product,
          attributes: ['name', 'type']
        }
      ],
      group: ['SaleItem.id_product', 'Product.id', 'Product.name', 'Product.type'],
      order: [[sequelize.literal('avg_score'), 'DESC']],
      limit: 3
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getLogsByRange = async (req, res) => {
  try {
    const { from, to } = req.query;

    let where = {};
    if (from && to) {
      where.createdAt = {
        [Op.between]: [new Date(from), new Date(`${to}T23:59:59`)]
      };
    }

    const result = await Log.findAll({
      where,
      include: [{
        model: Admin,
        attributes: ['username']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getMostActiveAdmins = async (req, res) => {
  try {
    const result = await Log.findAll({
      attributes: [
        'id_admin',
        [sequelize.fn('COUNT', sequelize.col('Log.id')), 'total_logs']
      ],
      include: [{
        model: Admin,
        attributes: ['username']
      }],
      group: ['id_admin', 'Admin.id'],
      order: [[sequelize.literal('total_logs'), 'DESC']],
      limit: 3
    });

    res.json(result);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { 
    getMostPurchased,
    getMostExpensiveProducts,
    getMostFrequentProductQuantity,
    getAllSales,
    getMostExpensiveSales,
    getMostLikedProducts,
    getLogsByRange,
    getMostActiveAdmins
};