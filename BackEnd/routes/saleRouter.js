const express = require("express");
const router = express.Router();

const {
    createSale,
    getSales,
    getSaleById,
    updateSale,
    deleteSale 
} = require("../controllers/saleController.js");

// Public routes (no authentication required)
router.get("/", getSales); 
router.get("/:id", getSaleById); 

// Protected routes (authentication required)
router.put("/:id", updateSale);
router.post("/", createSale); 
router.delete("/:id", deleteSale); 

module.exports = router;