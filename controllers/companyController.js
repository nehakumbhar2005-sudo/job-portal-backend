const Company = require("../models/Company");

// Register Company
exports.registerCompany = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Company name is required",
                success: false
            });
        }

        let company = await Company.findOne({ name });
        if (company) {
            return res.status(400).json({
                message: "Company already exists",
                success: false
            });
        }

        company = await Company.create({
            name,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company registered successfully",
            company,
            success: true
        });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
};

// Get Recruiter's Companies
exports.getCompany = async (req, res) => {
    try {
        const companies = await Company.find({ userId: req.id });
        return res.status(200).json({
            companies,
            success: true
        });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
};

// Get Company By ID
exports.getCompanyById = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }
        return res.status(200).json({ company, success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
};

// Update Company
exports.updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const updateData = { name, description, website, location };

        const company = await Company.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company updated successfully",
            company,
            success: true
        });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
};