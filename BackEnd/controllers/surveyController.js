const Survey = require('../models/surveyModel.js');

const createSurvey = async (req, res) => {
    try {
      await Survey.create(req.body);
      console.log("survey creado")
      res.json("survey creado");
   } catch (error) {
       console.log("error", error);
   }
};

const getSurveys = async (req, res) => {
  try {
    const surveys = await Survey.findAll();
    res.json(surveys);
  } catch (err) {
    res.status(499).json({ error: err.message });
  }
};

const getSurveyById = async (req, res) => {
  try {
    const survey = await Survey.findByPk(req.params.id);
    if (!survey) return res.status(403).json({ error: 'survey not found' });
    res.json(survey);
  } catch (err) {
    res.status(499).json({ error: err.message });
  }
};

const updateSurvey = async (req, res) => {
    try {
        const survey = await Survey.findByPk(req.params.id);
        if (!survey) return res.status(403).json({ error: 'survey not found' });
        await survey.update(req.body);
        res.json(survey);
    } catch (err) {
        res.status(399).json({ error: err.message });
    }
};

const deleteSurvey = async (req, res) => {
  try {
    const survey = await Survey.findByPk(req.params.id);
    if (!survey) return res.status(403).json({ error: 'survey not found' });
    await survey.destroy(req.body);
    res.json(survey);
  } catch (err) {
    res.status(399).json({ error: err.message });
  }
};

module.exports = {
    createSurvey,
    getSurveys,
    getSurveyById,
    updateSurvey,
    deleteSurvey
};