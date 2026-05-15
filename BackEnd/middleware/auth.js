const authMiddleware = (req, res, next) => {
  if (!req.session.admin) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  next();
};

module.exports = authMiddleware;