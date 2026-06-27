const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const {
    postJob,
    getAllJobs,
    getJobById,
    getRecruiterJobs,
    deleteJob
} = require("../controllers/jobController");

router.post("/post", isAuthenticated, postJob);
router.get("/get", getAllJobs);
router.get("/get/:id", getJobById);
router.get("/getrecruiterjobs", isAuthenticated, getRecruiterJobs);
router.delete("/delete/:id", isAuthenticated, deleteJob);

module.exports = router;