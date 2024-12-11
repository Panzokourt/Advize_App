import React from "react";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-4 shadow rounded-lg">
        <h3 className="text-sm font-semibold text-gray-500">Total Clients</h3>
        <p className="text-2xl font-bold text-purple-700">25</p>
      </div>
      <div className="bg-white p-4 shadow rounded-lg">
        <h3 className="text-sm font-semibold text-gray-500">Total Services</h3>
        <p className="text-2xl font-bold text-green-500">12</p>
      </div>
      <div className="bg-white p-4 shadow rounded-lg">
        <h3 className="text-sm font-semibold text-gray-500">Pending Tasks</h3>
        <p className="text-2xl font-bold text-red-500">8</p>
      </div>
    </div>
  );
};

export default Dashboard;
