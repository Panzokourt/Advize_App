import React from "react";

const Header = () => {
  return (
    <header className="bg-white h-16 shadow flex items-center justify-between px-6 fixed top-0 left-0 w-full z-10">
      <div className="flex items-center space-x-4">
        <h1 className="text-lg font-semibold text-gray-700">AdvizeApp</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-sm font-medium text-gray-600 hover:text-gray-800">Help</button>
        <button className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
