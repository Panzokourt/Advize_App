import React from "react";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">AdvizeApp</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="/dashboard" className="hover:underline">
              Dashboard
            </a>
          </li>
          <li>
            <a href="/clients" className="hover:underline">
              Clients
            </a>
          </li>
          <li>
            <a href="/services" className="hover:underline">
              Services
            </a>
          </li>
          <li>
            <a href="/tasks" className="hover:underline">
              Tasks
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
