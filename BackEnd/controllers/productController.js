const Product = require('../models/productModel.js');

const createProduct = async (req, res) => {
    try {
      await Product.create(req.body);
      console.log("producto creado")
      res.json("Producto creado");
   } catch (error) {
       console.log("error", error);
   }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        await product.update(req.body);
        res.json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleleProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    await product.destroy(req.body);
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleleProduct
};