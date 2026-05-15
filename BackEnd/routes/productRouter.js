const express = require("express");
const router = express.Router();

const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct 
} = require("../controllers/productController.js");

// Public routes (no authentication required)
router.get("/", getProducts); 
router.get("/:id", getProductById); 

// Protected routes (authentication required)
router.put("/:id", updateProduct);
router.post("/", createProduct); 
router.delete("/:id", deleteProduct); 

module.exports = router;