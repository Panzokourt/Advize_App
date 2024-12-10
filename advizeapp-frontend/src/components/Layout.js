import React from "react";
import Sidebar from "./Sidebar";
import "./App.css"; // Import the global CSS file for layout and sidebar styles

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="content-container">
        {children}
      </div>
    </div>
  );
};

export default Layout;
