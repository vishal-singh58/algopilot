import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Code2, Home, Trophy, BookDown, LogIn, LogOut } from "lucide-react";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if user is logged in (token stored in localStorage)
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // redirect to login page after logout
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="border-b border-white/10 bg-slate-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl text-white">AlgoPilot</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive("/") ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-white/10"
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link
              to="/dsa-sheet"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive("/dsa-sheet") ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-white/10"
              }`}
            >
              <BookDown className="w-4 h-4" />
              <span>DSA Sheet</span>
            </Link>
            <Link
              to="/code-review"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive("/code-review") ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-white/10"
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Code Review</span>
            </Link>
            <Link
              to="/contest"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive("/contest") ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-white/10"
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Contests</span>
            </Link>
          </div>

          {/* Right side: Login / Logout */}
          <div className="flex items-center gap-2">
            {!isLoggedIn ? (
              <Link
                to="/login"
                className="flex items-center gap-1 px-4 py-2 rounded-lg text-gray-300 hover:bg-white/10 transition"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-4 py-2 rounded-lg text-gray-300 hover:bg-white/10 transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
