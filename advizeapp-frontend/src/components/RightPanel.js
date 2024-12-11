// RightPanel.js
import React from "react";

const RightPanel = () => {
  return (
    <div className="w-1/4 h-screen bg-gray-50 border-l border-gray-300 p-4">
      <h3 className="text-lg font-bold mb-4">Activity</h3>
      <ul className="space-y-2">
        <li>New project created</li>
        <li>User joined your team</li>
        <li>File uploaded</li>
      </ul>
    </div>
  );
};

export default RightPanel;