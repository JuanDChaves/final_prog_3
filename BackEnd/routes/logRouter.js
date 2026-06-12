const express = require("express");
const router = express.Router();

const {
    createLog,
    getLogs,
} = require("../controllers/saleItemController.js");

router.get("/", getLogs); 
router.post("/", createLog); 

module.exports = router;