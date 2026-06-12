const express = require('express');
const router = express.Router();

const { 
    getMostPurchased,
    getMostExpensiveProducts,
    getMostFrequentProductQuantity,
    getAllSales,
    getMostExpensiveSales,
    getMostLikedProducts
} = require('../controllers/reportController.js');

router.get('/most-purchased', getMostPurchased);
router.get('/most-expensive-products', getMostExpensiveProducts);
router.get('/most-frequent-quantity', getMostFrequentProductQuantity);
router.get('/all-sales', getAllSales);
router.get('/most-expensive-sales', getMostExpensiveSales);
router.get('/most-liked', getMostLikedProducts);

/*
getTopAdminLogs: () => api.get('reports/top-logs'), //

  getLogsByRange: (from, to) => api.get(`/reports?from=${from}&to=${to}`) //
*/

module.exports = router;