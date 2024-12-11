import React from "react";
import { HomeIcon, UsersIcon, BriefcaseIcon, ClipboardListIcon } from "@heroicons/react/solid";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-purple-800 text-white flex flex-col">
      <div className="flex items-center justify-center h-16 font-bold border-b border-purple-700">
        AdvizeApp
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-3">
          <li>
            <a
              href="/dashboard"
              className="flex items-center space-x-3 p-2 rounded hover:bg-purple-700"
            >
              <HomeIcon className="w-5 h-5" />
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="/clients"
              className="flex items-center space-x-3 p-2 rounded hover:bg-purple-700"
            >
              <UsersIcon className="w-5 h-5" />
              <span>Clients</span>
            </a>
          </li>
          <li>
            <a
              href="/services"
              className="flex items-center space-x-3 p-2 rounded hover:bg-purple-700"
            >
              <BriefcaseIcon className="w-5 h-5" />
              <span>Services</span>
            </a>
          </li>
          <li>
            <a
              href="/tasks"
              className="flex items-center space-x-3 p-2 rounded hover:bg-purple-700"
            >
              <ClipboardListIcon className="w-5 h-5" />
              <span>Tasks</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
