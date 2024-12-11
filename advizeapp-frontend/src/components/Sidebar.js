import React from "react";
import { HomeIcon, UserGroupIcon, BriefcaseIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-purple-700 text-white h-full flex flex-col">
      <div className="flex items-center justify-center h-16 text-lg font-bold border-b border-purple-600">
        AdvizeApp
      </div>
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-4">
          <li>
            <a href="/dashboard" className="flex items-center space-x-3 hover:bg-purple-800 p-3 rounded">
              <HomeIcon className="w-6 h-6" />
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="/clients" className="flex items-center space-x-3 hover:bg-purple-800 p-3 rounded">
              <UserGroupIcon className="w-6 h-6" />
              <span>Clients</span>
            </a>
          </li>
          <li>
            <a href="/services" className="flex items-center space-x-3 hover:bg-purple-800 p-3 rounded">
              <BriefcaseIcon className="w-6 h-6" />
              <span>Services</span>
            </a>
          </li>
          <li>
            <a href="/tasks" className="flex items-center space-x-3 hover:bg-purple-800 p-3 rounded">
              <ClipboardDocumentListIcon className="w-6 h-6" />
              <span>Tasks</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
