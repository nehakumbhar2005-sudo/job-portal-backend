const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const {
    register,
    login,
    getProfile,
    updateProfile
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", isAuthenticated, getProfile);
router.put("/profile/update", isAuthenticated, updateProfile);

module.exports = router;