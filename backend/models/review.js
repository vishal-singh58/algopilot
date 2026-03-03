import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: String,
    code: String,
    language: String,
    review: String,
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);