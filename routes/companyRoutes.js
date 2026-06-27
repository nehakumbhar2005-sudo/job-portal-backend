const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const {
    registerCompany,
    getCompany,
    getCompanyById,
    updateCompany
} = require("../controllers/companyController");

router.post("/register", isAuthenticated, registerCompany);
router.get("/get", isAuthenticated, getCompany);
router.get("/get/:id", isAuthenticated, getCompanyById);
router.put("/update/:id", isAuthenticated, updateCompany);

module.exports = router;