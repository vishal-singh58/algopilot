import React from "react";
import { Code2, Mail, Lock, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Code2 className="w-10 h-10 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl text-white">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AlgoPilot
              </span>
            </h1>
            <p className="text-gray-400">Sign in to access your dashboard</p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-slate-800/50 border border-slate-700 backdrop-blur-sm rounded-lg">
          <div className="p-6 space-y-4">
            <div className="text-center">
              <h2 className="text-white text-xl font-semibold">Sign In</h2>
              <p className="text-gray-400">Enter your credentials to continue</p>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-gray-300 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-3 py-2 rounded-md bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-gray-300 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-3 py-2 rounded-md bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              className="w-full mt-2 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md text-white hover:from-blue-700 hover:to-purple-700 flex items-center justify-center gap-2"
            >
              <Loader2 className="w-4 h-4 animate-spin" />
              Sign In
            </button>

            {/* Signup Link */}
            <p className="text-sm text-gray-400 text-center mt-4">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-400 hover:text-blue-300">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-3 gap-4 text-center mt-6">
          <div className="space-y-1">
            <div className="text-2xl">🚀</div>
            <div className="text-xs text-gray-300">AI Review</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl">🏆</div>
            <div className="text-xs text-gray-300">Contests</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl">📚</div>
            <div className="text-xs text-gray-300">DSA Sheet</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
