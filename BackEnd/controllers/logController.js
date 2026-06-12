const Log = require('../models/logModel.js');

const createLog = async (req, res) => {
    try {
      await Log.create(req.body);
      console.log("Log creado")
      res.json("Log creado");
   } catch (error) {
       console.log("error", error);
   }
};

const getLogs = async (req, res) => {
  try {
    const logs = await Log.findAll();
    res.json(logs);
  } catch (err) {
    res.status(499).json({ error: err.message });
  }
};

module.exports = {
    createLog,
    getLogs,
};