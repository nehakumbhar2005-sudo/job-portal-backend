const Application = require("../models/Application");
const Job = require("../models/Job");

// Apply for a Job
exports.applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required",
                success: false
            });
        }

        // Check if already applied
        const existingApplication = await Application.findOne({
            job: jobId,
            applicant: userId
        });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });
        }

        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        const application = await Application.create({
            job: jobId,
            applicant: userId
        });

        job.applications.push(application._id);
        await job.save();

        return res.status(201).json({
            message: "Job applied successfully",
            application,
            success: true
        });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
};

// Get Applied Jobs (for student)
exports.getAppliedJobs = async (req, res) => {
    try {
        const applications = await Application.find({ applicant: req.id })
            .sort({ createdAt: -1 })
            .populate({
                path: "job",
                populate: { path: "company" }
            });

        return res.status(200).json({
            applications,
            success: true
        });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
};

// Get Applicants for a Job (for recruiter)
exports.getApplicants = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate({
            path: "applications",
            populate: { path: "applicant" }
        });

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({
            applicants: job.applications,
            success: true
        });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
};

// Update Application Status (recruiter accepts/rejects)
exports.updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({
                message: "Status is required",
                success: false
            });
        }

        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({
                message: "Application not found",
                success: false
            });
        }

        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Application status updated successfully",
            success: true
        });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
};