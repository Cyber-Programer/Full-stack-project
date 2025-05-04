const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// ✅ Only this ONE CORS middleware
app.use(cors({
  origin: "http://localhost:5173", // React Vite dev server
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require("./routes/authRoutes");
const friendRoutes = require("./routes/friendRoutes");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes")
const {
  handleNotFound,
  globalErrorHandler,
} = require("./controllers/errorController");

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/friends", friendRoutes);
app.use(userRoutes)

// Routes
app.get("/dashboard", (req, res) => {
  res.send("server is running..");
});

app.use(handleNotFound);
app.use(globalErrorHandler);

module.exports = app;
