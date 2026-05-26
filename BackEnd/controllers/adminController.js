const Admin = require('../models/adminModel.js');
const bcrypt = require('bcrypt');

const loginAdmin = async (req, res) => {
  try {
    if(req.session.admin) {
      return res.status(400).json({ error: "Ya hay una sesion activa" });
    }
    const { username, password } = req.body;

    const admin = await Admin.findOne({ where: { username } });
    if(!admin) return res.status(404).json({error: "Usuario no encontrado"})
    
    const match = await bcrypt.compare(password, admin.password);
    if(!match) return res.status(401).json({error: "Contrasena incorrecta"})

    req.session.admin = {id: admin.id, username: admin.username};

    res.json({ message: "Login exitoso"});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
}

const logoutAdmin = (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logged out' });
};

const createAdmin = async (req, res) => {
    try {
      const admin = await Admin.create(req.body);
      res.status(201).json(admin);
      res.json("admin creado");
   } catch (error) {
      res.status(400).json({ error: err.message });
   }
};

const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll({
      attributes: { exclude: ['password']}
    });
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) return res.status(404).json({ error: 'admin not found' });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.params.id);
        if (!admin) return res.status(403).json({ error: 'admin not found' });

        if (req.body.password) {
          req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        await admin.update(req.body);
        res.json(admin);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) return res.status(403).json({ error: 'admin not found' });
    await admin.destroy();
    res.json(admin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
    loginAdmin,
    logoutAdmin,
    createAdmin,
    getAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin
};