const express = require("express");
const router = express.Router();

const {
    createSaleItem,
    getSaleItems,
    getSaleItemById,
    updateSaleItem,
    deleteSaleItem 
} = require("../controllers/saleItemController.js");

// Public routes (no authentication required)
router.get("/", getSaleItems); 
router.get("/:id", getSaleItemById); 

// Protected routes (authentication required)
router.put("/:id", updateSaleItem);
router.post("/", createSaleItem); 
router.delete("/:id", deleteSaleItem); 

module.exports = router;