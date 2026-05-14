const Cart = require('../models/cartModel');

const createCart = async (req, res) => {
    try {
      await Cart.create(req.body);
      console.log("carrito creado")
      res.json("carrito creado");
   } catch (error) {
       console.log("error", error);
   }
};

const getCarts = async (req, res) => {
  try {
    const carts = await Cart.findAll();
    res.json(carts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCartById = async (req, res) => {
  try {
    const cart = await Cart.findByPk(req.params.id);
    if (!cart) return res.status(404).json({ error: 'carrito not found' });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCart = async (req, res) => {
    try {
        const cart = await Cart.findByPk(req.params.id);
        if (!cart) return res.status(404).json({ error: 'carrito not found' });
        await cart.update(req.body);
        res.json(cart);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findByPk(req.params.id);
    if (!cart) return res.status(404).json({ error: 'carrito not found' });
    await cart.destroy(req.body);
    res.json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
    createCart,
    getCarts,
    getCartById,
    updateCart,
    deleteCart
};