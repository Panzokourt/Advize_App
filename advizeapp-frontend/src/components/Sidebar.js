import React from "react";
import { HomeIcon, UsersIcon, BriefcaseIcon, ClipboardListIcon } from "@heroicons/react/outline";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-purple-700 text-white h-full pt-16 fixed">
      <div className="flex flex-col space-y-4 px-6">
        <a href="/dashboard" className="flex items-center space-x-3 hover:bg-purple-800 p-2 rounded">
          <HomeIcon className="w-6 h-6" />
          <span>Dashboard</span>
        </a>
        <a href="/clients" className="flex items-center space-x-3 hover:bg-purple-800 p-2 rounded">
          <UsersIcon className="w-6 h-6" />
          <span>Clients</span>
        </a>
        <a href="/services" className="flex items-center space-x-3 hover:bg-purple-800 p-2 rounded">
          <BriefcaseIcon className="w-6 h-6" />
          <span>Services</span>
        </a>
        <a href="/tasks" className="flex items-center space-x-3 hover:bg-purple-800 p-2 rounded">
          <ClipboardListIcon className="w-6 h-6" />
          <span>Tasks</span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
