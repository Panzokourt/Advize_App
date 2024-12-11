import React from "react";

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded p-4 text-center">
          <h3 className="text-sm font-semibold text-gray-500">Sales</h3>
          <p className="text-xl font-bold text-green-500">€4,525.00</p>
          <span className="text-xs text-gray-400">This month</span>
        </div>
        <div className="bg-white shadow rounded p-4 text-center">
          <h3 className="text-sm font-semibold text-gray-500">Expenses</h3>
          <p className="text-xl font-bold text-red-500">€2,199.36</p>
          <span className="text-xs text-gray-400">This month</span>
        </div>
        <div className="bg-white shadow rounded p-4 text-center">
          <h3 className="text-sm font-semibold text-gray-500">Cash Flow</h3>
          <p className="text-xl font-bold text-blue-500">€2,950.03</p>
          <span className="text-xs text-gray-400">Net balance</span>
        </div>
        <div className="bg-white shadow rounded p-4 text-center">
          <h3 className="text-sm font-semibold text-gray-500">Pending Invoices</h3>
          <p className="text-xl font-bold text-gray-600">€0.00</p>
          <span className="text-xs text-gray-400">Unpaid invoices</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
