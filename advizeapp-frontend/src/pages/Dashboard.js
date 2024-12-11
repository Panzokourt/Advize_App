import React from "react";

const Dashboard = () => {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <h3 className="text-lg font-bold">Total Clients</h3>
        <p className="text-2xl">10</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <h3 className="text-lg font-bold">Total Services</h3>
        <p className="text-2xl">25</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <h3 className="text-lg font-bold">Total Tasks</h3>
        <p className="text-2xl">50</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <h3 className="text-lg font-bold">Revenue</h3>
        <p className="text-2xl">$5000</p>
      </div>
    </div>
  );
};

export default Dashboard;
