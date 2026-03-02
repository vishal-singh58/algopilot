import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./navbar/Navbar";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {!hideNavbar && <Navbar />}
      <main className={!hideNavbar ? "pt-16" : ""}>
        {children}
      </main>
    </div>
  );
};

export default Layout;