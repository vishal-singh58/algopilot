import React from "react";
import { useState } from "react";
import { Code2, Mail, Lock, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSignup = async () => {
  try {
    setLoading(true);

    // Call signup API
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message); // show proper error message
      setLoading(false);
      navigate("/login"); // optional
      return;
    }

    // Auto-login
    const loginRes = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: formData.email, password: formData.password }),
    });

    const loginData = await loginRes.json();

    if (!loginRes.ok) {
      alert("Signup successful, but auto-login failed. Please login manually.");
      setLoading(false);
      navigate("/login");
      return;
    }

    localStorage.setItem("token", loginData.token);
    setLoading(false);
    navigate("/"); // redirect to home page

  } catch (error) {
    console.log("Signup Error:", error);
    setLoading(false);
  }
};
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
              Join{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AlgoPilot
              </span>
            </h1>
            <p className="text-gray-400">Create your account to get started</p>
          </div>
        </div>

        {/* Signup Card */}
        <div className="bg-slate-800/50 border border-slate-700 backdrop-blur-sm rounded-lg">
          <div className="p-6 space-y-4">
            <div className="text-center">
              <h2 className="text-white text-xl font-semibold">Sign Up</h2>
              <p className="text-gray-400">Fill in your details to continue</p>
            </div>

            {/* Name Input */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-gray-300 block">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-3 py-2 rounded-md bg-slate-700 text-white"
              />
            </div>

            {/* Email Input */}
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

            {/* Password Input */}
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

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSignup}
              disabled={loading}
              className="w-full mt-2 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md text-white flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Creating..." : "Sign Up"}
            </button>

            {/* Login Link */}
            <p className="text-sm text-gray-400 text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-400 hover:text-blue-300">
                Sign in
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

export default Signup;
