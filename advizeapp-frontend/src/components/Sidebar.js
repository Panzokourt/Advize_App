import React from "react";
import { HomeIcon, UserGroupIcon, BriefcaseIcon, ClipboardListIcon } from "@heroicons/react/outline";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-purple-700 text-white h-screen flex flex-col">
      <div className="p-4">
        <h2 className="text-2xl font-bold">AdvizeApp</h2>
      </div>
      <nav className="flex-1 px-4">
        <ul className="space-y-4">
          <li>
            <a href="/dashboard" className="flex items-center space-x-3 hover:bg-purple-800 p-2 rounded">
              <HomeIcon className="w-6 h-6" />
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="/clients" className="flex items-center space-x-3 hover:bg-purple-800 p-2 rounded">
              <UserGroupIcon className="w-6 h-6" />
              <span>Clients</span>
            </a>
          </li>
          <li>
            <a href="/services" className="flex items-center space-x-3 hover:bg-purple-800 p-2 rounded">
              <BriefcaseIcon className="w-6 h-6" />
              <span>Services</span>
            </a>
          </li>
          <li>
            <a href="/tasks" className="flex items-center space-x-3 hover:bg-purple-800 p-2 rounded">
              <ClipboardListIcon className="w-6 h-6" />
              <span>Tasks</span>
            </a>
          </li>
        </ul>
      </nav>
      <div className="p-4 text-sm text-center">
        <p>© 2024 AdvizeApp</p>
      </div>
    </aside>
  );
};

export default Sidebar;
