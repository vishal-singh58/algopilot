import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Code2, Home, Trophy,BookDown } from "lucide-react";

function Navbar() {
  const isActive = (path) => {
    return location.pathname === path;
  };
  const location = useLocation();
  return (
    <nav className="border-b border-white/10 bg-slate-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl text-white">AlgoPilot</span>
          </Link>

          <div className="flex gap-1">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive("/") && location.pathname === "/"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-white/10"
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>{" "}
            <Link
              to="/dsa-sheet"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive("/dsa-sheet")
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-white/10"
              }`}
            >
              <BookDown  className="w-4 h-4" />
              <span>DSA Sheet</span>
            </Link>
            <Link
              to="/code-review"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive("/code-review")
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-white/10"
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Code Review</span>
            </Link>
            <Link
              to="/contest"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive("/contest")
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-white/10"
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Contests</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
