import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contest from "./pages/Contest";
import CodeReview from "./pages/CodeReview";
import Dsasheet from "./pages/Dsasheet";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/layout";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Protected pages */}
          <Route path="/" element={<ProtectedRoute><Navigate to="/login" /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/contest" element={<ProtectedRoute><Contest /></ProtectedRoute>} />
          <Route path="/code-review" element={<ProtectedRoute><CodeReview /></ProtectedRoute>} />
          <Route path="/dsa-sheet" element={<ProtectedRoute><Dsasheet /></ProtectedRoute>} />

          {/* Public pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
        </Routes>
      </Layout>
    </Router>
  );
}


export default App;
