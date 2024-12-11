import React from "react";
import { FaTachometerAlt, FaUsers, FaTasks, FaCog } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="p-4">
        <h2 className="text-2xl font-bold">AdvizeApp</h2>
      </div>
      <ul className="mt-4 flex-1 space-y-4">
        <li>
          <a href="/dashboard" className="flex items-center px-4 py-2 hover:bg-gray-700">
            <FaTachometerAlt className="mr-2" /> Dashboard
          </a>
        </li>
        <li>
          <a href="/clients" className="flex items-center px-4 py-2 hover:bg-gray-700">
            <FaUsers className="mr-2" /> Clients
          </a>
        </li>
        <li>
          <a href="/services" className="flex items-center px-4 py-2 hover:bg-gray-700">
            <FaTasks className="mr-2" /> Services
          </a>
        </li>
        <li>
          <a href="/tasks" className="flex items-center px-4 py-2 hover:bg-gray-700">
            <FaCog className="mr-2" /> Tasks
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
