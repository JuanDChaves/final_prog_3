const Sale = require('../models/saleModel.js');

const createSale = async (req, res) => {
    try {
      await Sale.create(req.body);
      console.log("venta creado")
      res.json("venta creado");
   } catch (error) {
       console.log("error", error);
   }
};

const getSales = async (req, res) => {
  try {
    const sales = await Sale.findAll();
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.id);
    if (!sale) return res.status(404).json({ error: 'sale not found' });
    res.json(sale);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateSale = async (req, res) => {
    try {
        const sale = await Sale.findByPk(req.params.id);
        if (!sale) return res.status(404).json({ error: 'sale not found' });
        await sale.update(req.body);
        res.json(sale);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleteSale = async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.id);
    if (!sale) return res.status(404).json({ error: 'Sale not found' });
    await sale.destroy(req.body);
    res.json(sale);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
    createSale,
    getSales,
    getSaleById,
    updateSale,
    deleteSale
};