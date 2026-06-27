const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.id = decoded.userId;
        req.role = decoded.role;
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid token",
            success: false
        });
    }
};

module.exports = isAuthenticated;