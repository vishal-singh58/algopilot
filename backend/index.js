import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authroutes.js"; // Fix case if needed
import cors from "cors";
import codeReviewRoute from "./routes/codereview.js";
import rateLimit from "express-rate-limit";
import contestRoutes from "./routes/contest.routes.js";
import { startContestJobs } from "./jobs/contest.job.js";

dotenv.config();

// ✅ Create app FIRST
const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// ✅ Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per windowMs
  message: "Too many requests from this IP, please try again later."
});
app.use(limiter);


// API
app.use("/api/contests", contestRoutes);

// Start jobs
startContestJobs();


// ✅ Connect Database
connectDB();

// ✅ Routes
app.use("/api/auth", authRoutes);

//✅ code review api
app.use("/api/review", codeReviewRoute);

app.get("/", (req, res) => {
  res.send("AlgoPilot Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});