const express = require("express");
const router = express.Router();

const {
    createCart,
    getCarts,
    getCartById,
    updateCart,
    deleteCart 
} = require("../controllers/cartController.js");

// Public routes (no authentication required)
router.get("/", getCarts); 
router.get("/:id", getCartById); 

// Protected routes (authentication required)
router.put("/:id", updateCart);
router.post("/", createCart); 
router.delete("/:id", deleteCart); 

module.exports = router;