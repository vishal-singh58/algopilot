import express from "express";
import { GoogleGenAI } from "@google/genai";
import Review from "../models/Review.js";

const router = express.Router();

/* ===============================
   🔥 POST - Generate + Save Review
================================= */
router.post("/", async (req, res) => {
  try {
    const { code, language, userId } = req.body;

    if (!code || !userId) {
      return res.status(400).json({ error: "Code and userId required" });
    }

    // 🔥 DAILY LIMIT (5 per day)
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayCount = await Review.countDocuments({
      userId,
      createdAt: { $gte: todayStart },
    });

    if (todayCount >= 5) {
      return res.status(403).json({
        success: false,
        message: "Daily limit reached (5 reviews per day)",
      });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY,
    });

    const prompt = `
You are a senior software engineer.

Review this ${language || ""} code:

${code}

Give:
1. Issues
2. Improvements
3. Refactored version
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const reviewText = response.text;

    const newReview = await Review.create({
      userId,
      code,
      language,
      review: reviewText,
    });

    res.json({
      success: true,
      review: newReview,
      remainingToday: 5 - (todayCount + 1),
    });

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/* ===============================
   📜 GET - User Review History
================================= */
router.get("/:userId", async (req, res) => {
  try {
    const reviews = await Review.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      total: reviews.length,
      reviews,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;