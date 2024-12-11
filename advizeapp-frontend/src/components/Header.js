import React from "react";

const Header = () => {
  return (
    <header className="bg-white shadow fixed top-0 left-0 w-full h-16 flex items-center justify-between px-6 z-10">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold text-purple-700">AdvizeApp</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-sm font-medium text-gray-600 hover:text-gray-800">Notifications</button>
        <button className="text-sm font-medium text-gray-600 hover:text-gray-800">Profile</button>
      </div>
    </header>
  );
};

export default Header;
