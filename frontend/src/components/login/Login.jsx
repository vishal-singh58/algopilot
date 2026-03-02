import React, { useState } from "react";
import { Code2, Mail, Lock, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ hook for redirect

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      alert("Please fill email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message); // show proper error
        setLoading(false);
        return;
      }

      // ✅ Save token
      localStorage.setItem("token", data.token);

      // ✅ Redirect to home page
      navigate("/home"); // "/" is your home page route
      setLoading(false);
    } catch (error) {
      console.log("Login Error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Code2 className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl text-white">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AlgoPilot
            </span>
          </h1>
          <p className="text-gray-400">Sign in to access your dashboard</p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-800/50 border border-slate-700 backdrop-blur-sm rounded-lg p-6 space-y-4">
          <div className="text-center">
            <h2 className="text-white text-xl font-semibold">Login</h2>
            <p className="text-gray-400">Fill in your details to continue</p>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-gray-300 block">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full pl-10 pr-3 py-2 rounded-md bg-slate-700 text-white"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-gray-300 block">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full pl-10 pr-3 py-2 rounded-md bg-slate-700 text-white"
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="w-full mt-2 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md text-white flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Logging in..." : "Sign In"}
          </button>

          {/* Signup Link */}
          <p className="text-sm text-gray-400 text-center mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:text-blue-300">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
