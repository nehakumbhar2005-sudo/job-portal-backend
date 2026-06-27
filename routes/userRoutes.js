// backend/routes/userRoutes.js
router.put("/profile", isAuthenticated, async (req, res) => {
    try {
        const { bio, skills } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { bio, skills: skills?.split(",").map(s => s.trim()) },
            { new: true }
        );
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});