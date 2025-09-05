require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
const { generalLimiter } = require("./middlewares/rateLimiter");

const authRoutes = require("./routes/authRoutes");
const newRoutes = require("./routes/newRoutes");
const taskRoutes = require("./routes/taskRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
app.use(generalLimiter);

// Middleware to handle CORS
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production' 
      ? process.env.CLIENT_URL 
      : ["http://localhost:3000", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

//connect database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", newRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/reports", reportRoutes);
app.use("/uploads", express.static("uploads"));

// Error handling middleware (must be last)
app.use(errorHandler);

// ✅ Root route (to fix Cannot GET / on Render)
app.get("/", (req, res) => {
  res.send("✅ Backend is running on Render");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
