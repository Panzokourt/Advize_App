// Layout.js
import React from "react";
import Sidebar from "./Sidebar";
import RightPanel from "./RightPanel";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-white p-6">{children}</div>
      <RightPanel />
    </div>
  );
};

export default Layout;