import axios from "axios";

export const fetchCodeforcesContests = async () => {
  try {
    const response = await axios.get(
      "https://codeforces.com/api/contest.list"
    );

    const contests = response.data.result;

    const upcoming = contests
      .filter((contest) => contest.phase === "BEFORE")
      .sort((a, b) => a.startTimeSeconds - b.startTimeSeconds);

    return upcoming.map((contest) => ({
      id: contest.id,
      name: contest.name,
      platform: "Codeforces",
      startTime: new Date(
        contest.startTimeSeconds * 1000
      ).toISOString(),
      durationHours: Math.floor(
        contest.durationSeconds / 3600
      ),
      url: `https://codeforces.com/contest/${contest.id}`,
      type: contest.type,
    }));
  } catch (error) {
    console.error("CF Fetch Error:", error.message);
    return [];
  }
};