import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authroutes.js"; // Fix case if needed
import cors from "cors";

dotenv.config();

// ✅ Create app FIRST
const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ Connect Database
connectDB();

// ✅ Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("AlgoPilot Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});