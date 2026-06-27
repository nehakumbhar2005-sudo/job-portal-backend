const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
    try {
        const { fullname, email, password, role } = req.body;

        if (!fullname || !email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            password: hashedPassword,
            role
        });

        return res.status(201).json({
            message: "Account created successfully",
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        if (role !== user.role) {
            return res.status(400).json({
                message: "Account does not exist with current role",
                success: false
            });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            message: `Welcome back ${user.fullname}`,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role,
                profile: user.profile
            },
            token,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};

// GET PROFILE
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.id).select("-password");
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        return res.status(200).json({
            user,
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
    try {
        const { fullname, bio, skills } = req.body;
        const skillsArray = skills ? skills.split(",") : [];

        const user = await User.findById(req.id);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        if (fullname) user.fullname = fullname;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;

        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role,
                profile: user.profile
            },
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};