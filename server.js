const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const companyRoutes = require("./routes/companyRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

dotenv.config();

connectDB();

const app = express();

// Middlewares
//app.use(cors());
//app.use(express.json());
app.use(cors({
    origin: "*",
    credentials: true
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/application", applicationRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Job Portal API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});