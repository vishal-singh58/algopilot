import { useState, useEffect } from "react";
import {
  CheckCircle2,
  Search,
  Trophy,
  TrendingUp,
} from "lucide-react";

const DSA_PROBLEMS = [
   {
    id: 1,
    category: "Arrays",
    difficulty: "Easy",
    title: "Two Sum",
    platform: "LeetCode",
    link: "https://leetcode.com/problems/two-sum/",
  },
  {
    id: 2,
    category: "Arrays",
    difficulty: "Medium",
    title: "3Sum",
    platform: "LeetCode",
    link: "https://leetcode.com/problems/3sum/",
  },
  {
    id: 3,
    category: "Arrays",
    difficulty: "Medium",
    title: "Container With Most Water",
    platform: "LeetCode",
    link: "https://leetcode.com/problems/container-with-most-water/",
  },
  {
    id: 4,
    category: "Arrays",
    difficulty: "Hard",
    title: "Trapping Rain Water",
    platform: "LeetCode",
    link: "https://leetcode.com/problems/trapping-rain-water/",
  },
  // Strings
  {
    id: 5,
    category: "Strings",
    difficulty: "Easy",
    title: "Valid Anagram",
    platform: "LeetCode",
    link: "https://leetcode.com/problems/valid-anagram/",
  },
  {
    id: 6,
    category: "Strings",
    difficulty: "Medium",
    title: "Longest Substring Without Repeating Characters",
    platform: "LeetCode",
    link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
  },
  {
    id: 7,
    category: "Strings",
    difficulty: "Medium",
    title: "Longest Palindromic Substring",
    platform: "LeetCode",
    link: "https://leetcode.com/problems/longest-palindromic-substring/",
  },
  // Linked List
  {
    id: 8,
    category: "Linked List",
    difficulty: "Easy",
    title: "Reverse Linked List",
    platform: "LeetCode",
    link: "https://leetcode.com/problems/reverse-linked-list/",
  },
  {
    id: 9,
    category: "Linked List",
    difficulty: "Medium",
    title: "Add Two Numbers",
    platform: "LeetCode",
    link: "https://leetcode.com/problems/add-two-numbers/",
  },
  {
    id: 10,
    category: "Linked List",
    difficulty: "Hard",
    title: "Merge k Sorted Lists",
    platform: "LeetCode",
    link: "https://leetcode.com/problems/merge-k-sorted-lists/",
  },
  // Trees
  {
    id: 11,
    category: "Trees",
    difficulty: "Easy",
    title: "Maximum Depth of Binary Tree",
    platform: "LeetCode",
    link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
  },
  {
    id: 12,
    category: "Trees",
    difficulty: "Medium",
    title: "Binary Tree Level Order Traversal",
    platform: "LeetCode",
    link: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
  },
  {
    id: 13,
    category: "Trees",
    difficulty: "Hard",
    title: "Binary Tree Maximum Path Sum",
    platform: "LeetCode",
    link: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
  },
  // Dynamic Programming
  {
    id: 14,
    category: "Dynamic Programming",
    difficulty: "Easy",
    title: "Climbing Stairs",
    platform: "LeetCode",
    link: "https://leetcode.com/problems/climbing-stairs/",
  },
  {
    id: 15,
    category: "Dynamic Programming",
    difficulty: "Medium",
    title: "Coin Change",
    platform: "LeetCode",
    link: "https://leetcode.com/problems/coin-change/",
  },
  {
    id: 16,
    category: "Dynamic Programming",
    difficulty: "Hard",
    title: "Edit Distance",
    platform: "LeetCode",
    link: "https://leetcode.com/problems/edit-distance/",
  },
  // Graphs
  {
    id: 17,
    category: "Graphs",
    difficulty: "Medium",
    title: "Number of Islands",
    platform: "LeetCode",
    link: "https://leetcode.com/problems/number-of-islands/",
  },
  {
    id: 18,
    category: "Graphs",
    difficulty: "Medium",
    title: "Course Schedule",
    platform: "LeetCode",
    link: "https://leetcode.com/problems/course-schedule/",
  },
  {
    id: 19,
    category: "Graphs",
    difficulty: "Hard",
    title: "Word Ladder",
    platform: "LeetCode",
    link: "https://leetcode.com/problems/word-ladder/",
  },
  // (Keep your same problems array here — unchanged)
];

const difficultyColors = {
  Easy: "bg-green-500/20 text-green-300 border-green-500/30",
  Medium: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  Hard: "bg-red-500/20 text-red-300 border-red-500/30",
};

const Dsasheet = () => {
  const [completedProblems, setCompletedProblems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  useEffect(() => {
    const saved = localStorage.getItem("algopilot_completed");
    if (saved) setCompletedProblems(JSON.parse(saved));
  }, []);

  const toggleComplete = (problemId) => {
    const newCompleted = completedProblems.includes(problemId)
      ? completedProblems.filter((id) => id !== problemId)
      : [...completedProblems, problemId];

    setCompletedProblems(newCompleted);
    localStorage.setItem("algopilot_completed", JSON.stringify(newCompleted));
  };

  const filteredProblems = DSA_PROBLEMS.filter((problem) => {
    const matchesSearch = problem.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      problem.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === "all" ||
      problem.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const totalProblems = DSA_PROBLEMS.length;
  const completedCount = completedProblems.length;
  const progressPercentage = (completedCount / totalProblems) * 100;

  const categories = ["all", ...new Set(DSA_PROBLEMS.map((p) => p.category))];
  const difficulties = ["all", "Easy", "Medium", "Hard"];

  const getCategoryStats = (category) => {
    const categoryProblems = DSA_PROBLEMS.filter(
      (p) => p.category === category
    );
    const completed = categoryProblems.filter((p) =>
      completedProblems.includes(p.id)
    ).length;
    return { total: categoryProblems.length, completed };
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          DSA Sheet Tracker
        </h1>
        <p className="text-gray-400">
          Track your progress through DSA problems
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid md:grid-cols-3 gap-4">

        {/* Overall Progress */}
        <div className="p-6 rounded-xl bg-blue-500/10 border border-blue-500/30">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-300">Overall Progress</span>
            <Trophy className="w-5 h-5 text-blue-400" />
          </div>

          <div className="text-3xl text-white">
            {completedCount}/{totalProblems}
          </div>

          <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <p className="text-sm text-gray-400 mt-2">
            {progressPercentage.toFixed(1)}% Complete
          </p>
        </div>

        {/* Easy Problems */}
        <div className="p-6 rounded-xl bg-green-500/10 border border-green-500/30">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Easy Problems</span>
            <CheckCircle2 className="w-5 h-5 text-green-400" />
          </div>

          <div className="text-3xl text-white mt-2">
            {
              DSA_PROBLEMS.filter(
                (p) =>
                  p.difficulty === "Easy" &&
                  completedProblems.includes(p.id)
              ).length
            }
            /
            {DSA_PROBLEMS.filter((p) => p.difficulty === "Easy").length}
          </div>
        </div>

        {/* Streak */}
        <div className="p-6 rounded-xl bg-purple-500/10 border border-purple-500/30">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Streak</span>
            <TrendingUp className="w-5 h-5 text-purple-400" />
          </div>

          <div className="text-3xl text-white mt-2">
            7 Days
          </div>

          <p className="text-sm text-gray-400">
            Keep it up 🔥
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl flex flex-col md:flex-row gap-4">

        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search problems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 p-2 bg-slate-900 border border-slate-700 rounded-md text-white"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-md text-white"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all" ? "All Categories" : cat}
            </option>
          ))}
        </select>

        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-md text-white"
        >
          {difficulties.map((diff) => (
            <option key={diff} value={diff}>
              {diff === "all" ? "All Levels" : diff}
            </option>
          ))}
        </select>
      </div>

      {/* Problems List */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 space-y-2">

        {filteredProblems.map((problem) => {
          const isCompleted = completedProblems.includes(problem.id);

          return (
            <div
              key={problem.id}
              className={`flex items-center gap-4 p-4 rounded-lg border transition ${
                isCompleted
                  ? "bg-green-500/10 border-green-500/30"
                  : "bg-slate-900/50 border-slate-700"
              }`}
            >
              <input
                type="checkbox"
                checked={isCompleted}
                onChange={() => toggleComplete(problem.id)}
                className="w-4 h-4"
              />

              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <a
                    href={problem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-medium ${
                      isCompleted
                        ? "text-green-300"
                        : "text-white"
                    }`}
                  >
                    {problem.title}
                  </a>

                  <span
                    className={`text-xs px-2 py-1 rounded border ${difficultyColors[problem.difficulty]}`}
                  >
                    {problem.difficulty}
                  </span>

                  <span className="text-xs px-2 py-1 border border-slate-600 text-gray-400 rounded">
                    {problem.category}
                  </span>
                </div>

                <p className="text-sm text-gray-500">
                  {problem.platform}
                </p>
              </div>

              {isCompleted && (
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Dsasheet;