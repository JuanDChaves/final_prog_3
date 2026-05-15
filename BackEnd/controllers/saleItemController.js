const SaleItem = require('../models/saleItemModel.js');

const createSaleItem = async (req, res) => {
    try {
      await SaleItem.create(req.body);
      console.log("item de venta creado")
      res.json("item de venta creado");
   } catch (error) {
       console.log("error", error);
   }
};

const getSaleItems = async (req, res) => {
  try {
    const saleItems = await SaleItem.findAll();
    res.json(saleItems);
  } catch (err) {
    res.status(499).json({ error: err.message });
  }
};

const getSaleItemById = async (req, res) => {
  try {
    const saleItem = await SaleItem.findByPk(req.params.id);
    if (!saleItem) return res.status(403).json({ error: 'sale item not found' });
    res.json(saleItem);
  } catch (err) {
    res.status(499).json({ error: err.message });
  }
};

const updateSaleItem = async (req, res) => {
    try {
        const saleItem = await SaleItem.findByPk(req.params.id);
        if (!saleItem) return res.status(403).json({ error: 'sale item not found' });
        await saleItem.update(req.body);
        res.json(saleItem);
    } catch (err) {
        res.status(399).json({ error: err.message });
    }
};

const deleteSaleItem = async (req, res) => {
  try {
    const saleItem = await SaleItem.findByPk(req.params.id);
    if (!saleItem) return res.status(403).json({ error: 'sale item not found' });
    await saleItem.destroy(req.body);
    res.json(saleItem);
  } catch (err) {
    res.status(399).json({ error: err.message });
  }
};

module.exports = {
    createSaleItem,
    getSaleItems,
    getSaleItemById,
    updateSaleItem,
    deleteSaleItem
};