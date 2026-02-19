import { useState } from "react";
import { Calendar, Clock, ExternalLink, Bell } from "lucide-react";

const MOCK_CONTESTS = [
  {
    id: "1",
    name: "Codeforces Round #932 (Div. 2)",
    platform: "Codeforces",
    startTime: new Date("2026-02-18T14:35:00"),
    duration: "2h",
    url: "https://codeforces.com",
    difficulty: "Div. 2"
  },
  {
    id: "2",
    name: "Weekly Contest 382",
    platform: "LeetCode",
    startTime: new Date("2026-02-17T02:30:00"),
    duration: "1h 30m",
    url: "https://leetcode.com",
  },
  {
    id: "3",
    name: "Starters 120",
    platform: "CodeChef",
    startTime: new Date("2026-02-19T20:00:00"),
    duration: "2h",
    url: "https://codechef.com",
  },
  {
    id: "4",
    name: "AtCoder Beginner Contest 340",
    platform: "AtCoder",
    startTime: new Date("2026-02-17T21:00:00"),
    duration: "1h 40m",
    url: "https://atcoder.jp",
  },
  {
    id: "5",
    name: "Educational Codeforces Round 162",
    platform: "Codeforces",
    startTime: new Date("2026-02-20T17:35:00"),
    duration: "2h",
    url: "https://codeforces.com",
    difficulty: "Educational"
  },
  {
    id: "6",
    name: "Biweekly Contest 123",
    platform: "LeetCode",
    startTime: new Date("2026-02-23T02:30:00"),
    duration: "1h 30m",
    url: "https://leetcode.com",
  },
];

const platformColors = {
  Codeforces: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  LeetCode: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  CodeChef: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  AtCoder: "bg-gray-500/20 text-gray-300 border-gray-500/30",
};

 const Contest = () => {
  const [filter, setFilter] = useState("all");

  const formatDate = (date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `In ${days} day${days > 1 ? "s" : ""} ${hours}h`;
    if (hours > 0) return `In ${hours} hour${hours > 1 ? "s" : ""}`;

    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `In ${Math.max(0, minutes)} minutes`;
  };

  const formatDateTime = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredContests =
    filter === "all"
      ? MOCK_CONTESTS
      : MOCK_CONTESTS.filter((c) => c.platform === filter);

  return (
    <div className="max-w-6xl mx-auto space-y-6 text-white">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl">Contest Tracker</h1>
          <p className="text-gray-400">
            Stay updated with upcoming competitive programming contests
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition">
          <Bell className="w-4 h-4" />
          Set Reminders
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-3 bg-slate-800 p-2 rounded-lg border border-slate-700">
        {["all", "Codeforces", "LeetCode", "CodeChef", "AtCoder"].map(
          (platform) => (
            <button
              key={platform}
              onClick={() => setFilter(platform)}
              className={`px-4 py-2 rounded-md text-sm transition ${
                filter === platform
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {platform === "all" ? "All Platforms" : platform}
            </button>
          )
        )}
      </div>

      {/* Contest List */}
      <div className="space-y-4">
        {filteredContests.map((contest) => (
          <div
            key={contest.id}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition"
          >
            <div className="flex items-start justify-between gap-4">

              <div className="flex-1 space-y-3">

                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-lg">{contest.name}</h3>

                  <span
                    className={`px-3 py-1 text-sm rounded-full border ${platformColors[contest.platform]}`}
                  >
                    {contest.platform}
                  </span>

                  {contest.difficulty && (
                    <span className="px-3 py-1 text-sm rounded-full border border-slate-600 text-gray-400">
                      {contest.difficulty}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDateTime(contest.startTime)}
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {contest.duration}
                  </div>
                </div>

                <div className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-500/30 inline-block">
                  {formatDate(contest.startTime)}
                </div>
              </div>

              <button
                onClick={() => window.open(contest.url, "_blank")}
                className="p-2 bg-slate-700 border border-slate-600 rounded-md hover:bg-slate-600 transition"
              >
                <ExternalLink className="w-4 h-4" />
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="grid md:grid-cols-3 gap-4 pt-6">

        <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 text-center">
          <div className="text-2xl text-blue-400">
            {MOCK_CONTESTS.length}
          </div>
          <div className="text-sm text-gray-400 mt-1">
            Upcoming Contests
          </div>
        </div>

        <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 text-center">
          <div className="text-2xl text-purple-400">4</div>
          <div className="text-sm text-gray-400 mt-1">
            Platforms Tracked
          </div>
        </div>

        <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 text-center">
          <div className="text-2xl text-green-400">24/7</div>
          <div className="text-sm text-gray-400 mt-1">
            Real-time Updates
          </div>
        </div>

      </div>
    </div>
  );
}
export default Contest;