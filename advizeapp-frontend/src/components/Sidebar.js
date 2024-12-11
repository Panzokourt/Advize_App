import React from "react";
import { HomeModernIcon, UserGroupIcon, BriefcaseIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {
  return (
    <aside className="w-60 bg-purple-700 text-white h-screen flex flex-col">
      <div className="p-4">
        <h2 className="text-lg font-semibold">AdvizeApp</h2>
      </div>
      <nav className="flex-1 px-2">
        <ul className="space-y-2">
          <li>
            <a href="/dashboard" className="flex items-center space-x-3 hover:bg-purple-800 p-2 rounded text-sm">
              <HomeModernIcon className="w-5 h-5" />
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="/clients" className="flex items-center space-x-3 hover:bg-purple-800 p-2 rounded text-sm">
              <UserGroupIcon className="w-5 h-5" />
              <span>Clients</span>
            </a>
          </li>
          <li>
            <a href="/services" className="flex items-center space-x-3 hover:bg-purple-800 p-2 rounded text-sm">
              <BriefcaseIcon className="w-5 h-5" />
              <span>Services</span>
            </a>
          </li>
          <li>
            <a href="/tasks" className="flex items-center space-x-3 hover:bg-purple-800 p-2 rounded text-sm">
              <ClipboardDocumentListIcon className="w-5 h-5" />
              <span>Tasks</span>
            </a>
          </li>
        </ul>
      </nav>
      <div className="p-4 text-xs text-center">
        <p>© 2024 AdvizeApp</p>
      </div>
    </aside>
  );
};

export default Sidebar;
