import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-1/5 h-screen bg-gray-100 dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 p-4">
      <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-200">AdvizeApp</h2>
      <nav>
        <ul className="space-y-4">
          <li><Link to="/" className="hover:text-purple-600">Dashboard</Link></li>
          <li><Link to="/clients" className="hover:text-purple-600">Clients</Link></li>
          <li><Link to="/services" className="hover:text-purple-600">Services</Link></li>
          <li><Link to="/tasks" className="hover:text-purple-600">Tasks</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
