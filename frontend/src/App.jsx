import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contest from "./pages/Contest";
import Home from "./pages/Home";
import CodeReview from "./pages/CodeReview";
import Navbar from "./components/navbar/Navbar";
import Dsasheet from "./pages/dsasheet"; 

function App() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <Router>
          
            
            <Navbar />
          
<main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contest" element={<Contest />} />
              <Route path="/code-review" element={<CodeReview />} />
              <Route path="/dsa-sheet" element={<Dsasheet />} />
              
            </Routes>
          </main>
        </Router>
      </div>
    </>
  );
}

export default App;
