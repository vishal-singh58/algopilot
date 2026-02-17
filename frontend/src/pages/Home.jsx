import React from "react";
import {
  Code2,
  Trophy,
  Sparkles,
  BookOpen,
  Target,
  CheckSquare,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="space-y-12">
        <div className="text-center space-y-6 py-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
            <Sparkles className="w-4 h-4" />
            <span> AI-Powered Competitive Programming Assistant</span>
          </div>
          <h1 className="text-5xl text-white">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AlgoPilot
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Your ultimate companion for competitive programming. Get instant AI
            code reviews and never miss a contest again.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* DSA Sheet Tracker */}
          <div className="bg-slate-800/50 border border-slate-700 hover:border-green-500/50 transition-all rounded-xl p-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-white" />
            </div>

            <h3 className="text-xl text-white font-semibold mb-2">
              DSA Sheet Tracker
            </h3>

            <p className="text-gray-400 mb-6">
              Track your progress through essential algorithms and data
              structures
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <CheckSquare className="w-5 h-5 text-green-400 mt-1" />
                <div>
                  <div className="text-white">Progress Tracking</div>
                  <div className="text-sm text-gray-400">
                    Mark problems as completed
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-green-400 mt-1" />
                <div>
                  <div className="text-white">Curated Problems</div>
                  <div className="text-sm text-gray-400">
                    Essential DSA topics covered
                  </div>
                </div>
              </div>
            </div>

            <Link to="/dsa-sheet">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
                Start Practicing
              </button>
            </Link>
          </div>

          {/* AI Code Review */}
          <div className="bg-slate-800/50 border border-slate-700 hover:border-blue-500/50 transition-all rounded-xl p-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
              <Code2 className="w-6 h-6 text-white" />
            </div>

            <h3 className="text-xl text-white font-semibold mb-2">
              AI Code Review
            </h3>

            <p className="text-gray-400 mb-6">
              Get instant, intelligent feedback on your algorithms and code
              quality
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <div className="text-white">Time Complexity Analysis</div>
                  <div className="text-sm text-gray-400">
                    Understand the efficiency of your solution
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <div className="text-white">Code Optimization</div>
                  <div className="text-sm text-gray-400">
                    Receive suggestions to improve your code
                  </div>
                </div>
              </div>
            </div>

            <Link to="/code-review">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                Start Review
              </button>
            </Link>
          </div>

          {/* Contest Tracker */}
          
            <div className="bg-slate-800/50 border border-slate-700 hover:border-purple-500/50 transition-all rounded-xl p-6 flex flex-col h-full">
  
  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
    <Trophy className="w-6 h-6 text-white" />
  </div>

  <h3 className="text-xl text-white font-semibold mb-2">
    Contest Tracker
  </h3>

  <p className="text-gray-400 mb-6">
    Track upcoming contests from all major competitive programming platforms
  </p>

  <div className="flex flex-wrap gap-2 mb-6">
    {["Codeforces", "LeetCode", "CodeChef"].map(
      (platform) => (
        <div
          key={platform}
          className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30 text-sm"
        >
          {platform}
        </div>
      )
    )}
  </div>

  <div className="flex items-start gap-3 mb-6">
    <CheckSquare className="w-5 h-5 text-green-400 mt-1" />
    <div>
      <div className="text-white">Contest Reminders</div>
      <div className="text-sm text-gray-400">
        Never miss important contests
      </div>
    </div>
  </div>

  {/* Button pushed to bottom */}
  <div className="mt-auto">
    <Link to="/contest">
      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors">
        View Contests
      </button>
    </Link>
  </div>

</div>
        </div>

        <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto py-12">
          <div className="text-center space-y-2">
            <div className="text-3xl text-blue-400">10K+</div>
            <div className="text-gray-400">Code Reviews</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl text-purple-400">50+</div>
            <div className="text-gray-400">Contest Platforms</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl text-green-400">99.9%</div>
            <div className="text-gray-400">Accuracy</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
