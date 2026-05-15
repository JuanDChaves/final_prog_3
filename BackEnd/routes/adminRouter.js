const express = require("express");
const router = express.Router();
const hashPassword = require('../middleware/hashPassword.js');
const auth = require('../middleware/auth.js');

const {
    loginAdmin,
    logoutAdmin,
    createAdmin,
    getAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin 
} = require("../controllers/adminController.js");


router.post("/login", loginAdmin);
router.post("/register", hashPassword, createAdmin); 

router.get("/", auth, getAdmins); 
router.get("/:id", auth, getAdminById); 
router.put("/:id", auth, hashPassword, updateAdmin);
router.delete("/:id", auth, deleteAdmin); 
router.post("/logout", auth, logoutAdmin);

module.exports = router;