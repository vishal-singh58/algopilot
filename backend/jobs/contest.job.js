import cron from "node-cron";
import { fetchCodeforcesContests } from "../scrapers/codeforces.scraper.js";

/**
 * Cron schedule:
 * - Every 15 minutes
 */
export function startContestJobs() {
  cron.schedule("*/15 * * * *", async () => {
    console.log("[Job] Running contest sync…");
    await fetchCodeforcesContests();
  });
}