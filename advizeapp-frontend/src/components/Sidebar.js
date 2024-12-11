// src/components/Sidebar.js
import React from "react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen">
      <div className="p-4">
        <h2 className="text-xl font-bold">AdvizeApp</h2>
      </div>
      <ul className="mt-4 space-y-2">
        <li>
          <a href="/dashboard" className="block p-2 hover:bg-gray-700">
            Dashboard
          </a>
        </li>
        <li>
          <a href="/clients" className="block p-2 hover:bg-gray-700">
            Clients
          </a>
        </li>
        <li>
          <a href="/services" className="block p-2 hover:bg-gray-700">
            Services
          </a>
        </li>
        <li>
          <a href="/tasks" className="block p-2 hover:bg-gray-700">
            Tasks
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
