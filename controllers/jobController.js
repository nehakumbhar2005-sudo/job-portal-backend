const Job = require("../models/Job");

// Post a Job
exports.postJob = async (req, res) => {
    try {
        const {
            title, description, requirements, salary,
            location, jobType, experienceLevel, position, companyId
        } = req.body;

        if (!title || !description || !requirements || !salary ||
            !location || !jobType || !experienceLevel || !position || !companyId) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: Number(experienceLevel),
            position: Number(position),
            company: companyId,
            created_by: req.id
        });

        return res.status(201).json({
            message: "Job posted successfully",
            job,
            success: true
        });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
};

// Get All Jobs (for students)
exports.getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        };

        const jobs = await Job.find(query)
            .populate("company")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
};

// Get Job By ID
exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate("applications");
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }
        return res.status(200).json({ job, success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
};

// Get Recruiter's Jobs
exports.getRecruiterJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ created_by: req.id }).populate("company");
        return res.status(200).json({ jobs, success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
};

// Delete Job
exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Job deleted successfully",
            success: true
        });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
};