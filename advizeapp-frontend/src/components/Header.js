import React from "react";
import { HomeModernIcon, UserGroupIcon, BriefcaseIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-purple-700 text-white h-full flex flex-col pt-20">
      <nav className="px-4">
        <ul className="space-y-4">
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
    </aside>
  );
};

export default Sidebar;
