const express = require('express');
const router = express.Router();

const { 
    getMostPurchased,
    getMostExpensiveProducts,
    getMostFrequentProductQuantity,
    getAllSales,
    getMostExpensiveSales,
    getMostLikedProducts,
    getLogsByRange,
    getMostActiveAdmins
} = require('../controllers/reportController.js');

router.get('/most-purchased', getMostPurchased);
router.get('/most-expensive-products', getMostExpensiveProducts);
router.get('/most-frequent-quantity', getMostFrequentProductQuantity);
router.get('/all-sales', getAllSales);
router.get('/most-expensive-sales', getMostExpensiveSales);
router.get('/most-liked', getMostLikedProducts);
router.get('/logs', getLogsByRange);
router.get('/most-active', getMostActiveAdmins);

module.exports = router;