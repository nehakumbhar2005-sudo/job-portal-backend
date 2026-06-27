const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const {
    applyJob,
    getAppliedJobs,
    getApplicants,
    updateStatus
} = require("../controllers/applicationController");

router.post("/apply/:id", isAuthenticated, applyJob);
router.get("/get", isAuthenticated, getAppliedJobs);
router.get("/:id/applicants", isAuthenticated, getApplicants);
router.put("/status/:id/update", isAuthenticated, updateStatus);

module.exports = router;