
import mongoose from "mongoose";

const contestSchema = new mongoose.Schema(
  {
    platform: { type: String, required: true, index: true },
    platformContestId: { type: String, index: true },
    title: String,
    url: String,
    startTime: Date,
    durationMinutes: Number,
    status: {
      type: String,
      enum: ["upcoming", "running", "past"],
      index: true,
    },
    fetchedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Contest", contestSchema);