const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;  

const hashPassword = async (req, res, next) => {
  try {
    if (!req.body.password) return next();

    req.body.password = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    next();
  } catch (err) {
    res.status(500).json({ error: 'Error encrypting password' });
  }
};

module.exports = hashPassword;