import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
