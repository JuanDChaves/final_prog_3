const express = require("express");
const router = express.Router();

const {
    createSurvey,
    getSurveys,
    getSurveyById,
    updateSurvey,
    deleteSurvey 
} = require("../controllers/surveyController.js");

// Public routes (no authentication required)
router.get("/", getSurveys); 
router.get("/:id", getSurveyById); 

// Protected routes (authentication required)
router.put("/:id", updateSurvey);
router.post("/", createSurvey); 
router.delete("/:id", deleteSurvey); 

module.exports = router;