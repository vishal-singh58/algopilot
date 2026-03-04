import express from "express";
import { fetchCodeforcesContests } from "../scrapers/codeforces.scraper.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const contests = await fetchCodeforcesContests();

  console.log("Sending contests:", contests);

  res.json(contests);
});

export default router;