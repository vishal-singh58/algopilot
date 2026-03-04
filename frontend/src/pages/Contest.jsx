import { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, Clock, ExternalLink } from "lucide-react";

const platformColors = {
  Codeforces: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  LeetCode: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  CodeChef: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  AtCoder: "bg-gray-500/20 text-gray-300 border-gray-500/30",
};

const Contest = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/contests`
        );

        setContests(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load contests");
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  // Live refresh every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setContests((prev) => [...prev]);
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    if (!date) return "Date not available";
    const d = new Date(date);
    return isNaN(d.getTime()) ? "Invalid date" : d.toLocaleString();
  };

  const formatCountdown = (startTime) => {
    if (!startTime) return "No date";

    const start = new Date(startTime);
    if (isNaN(start.getTime())) return "Invalid date";

    const now = new Date();
    const diff = start - now;

    if (diff <= 0) return "Live or Started";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    if (days > 0) return `In ${days}d ${hours}h`;
    if (hours > 0) return `In ${hours}h ${minutes}m`;
    return `In ${minutes}m`;
  };

  // Filter by platform
  const filtered =
    filter === "all"
      ? contests
      : contests.filter((c) => c.platform === filter);

  // ✅ Only sort (NO future filtering)
  const sorted = [...filtered].sort(
    (a, b) =>
      new Date(a.startTime).getTime() -
      new Date(b.startTime).getTime()
  );

  if (loading)
    return (
      <div className="text-center mt-20 text-gray-400">
        Loading contests...
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-20 text-red-400">
        {error}
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-6 text-white">
      <h1 className="text-3xl font-bold tracking-tight">
        AlgoPilot Contest Tracker
      </h1>

      {/* Filter Tabs */}
      <div className="flex gap-3 flex-wrap">
        {["all", "Codeforces", "LeetCode", "CodeChef", "AtCoder"].map(
          (platform) => (
            <button
              key={platform}
              onClick={() => setFilter(platform)}
              className={`px-4 py-2 rounded-md text-sm transition ${
                filter === platform
                  ? "bg-blue-600"
                  : "bg-slate-800 hover:bg-slate-700"
              }`}
            >
              {platform === "all" ? "All" : platform}
            </button>
          )
        )}
      </div>

      {/* Contest List */}
      <div className="space-y-4">
        {sorted.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">
            No contests available.
          </div>
        ) : (
          sorted.map((contest) => (
            <div
              key={`${contest.platform}-${contest.id}`}
              className="bg-slate-900 border border-slate-700 p-6 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-lg font-semibold">
                      {contest.name}
                    </h3>

                    <span
                      className={`px-3 py-1 text-xs rounded-full border ${
                        platformColors[contest.platform] ||
                        "bg-gray-700"
                      }`}
                    >
                      {contest.platform}
                    </span>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      {formatDate(contest.startTime)}
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      {contest.durationHours
                        ? `${contest.durationHours}h`
                        : "N/A"}
                    </div>
                  </div>

                  <div className="text-green-400 text-sm font-medium">
                    {formatCountdown(contest.startTime)}
                  </div>
                </div>

                <button
                  onClick={() =>
                    contest.url &&
                    window.open(contest.url, "_blank")
                  }
                  className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
                >
                  <ExternalLink size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Contest;