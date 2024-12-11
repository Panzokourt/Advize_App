import React from "react";

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold">Sales</h3>
          <p className="text-2xl font-bold text-green-500">€4,525.00</p>
          <span className="text-sm text-gray-500">This month</span>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold">Expenses</h3>
          <p className="text-2xl font-bold text-red-500">€2,199.36</p>
          <span className="text-sm text-gray-500">This month</span>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold">Cash Flow</h3>
          <p className="text-2xl font-bold text-blue-500">€2,950.03</p>
          <span className="text-sm text-gray-500">Net balance</span>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold">Pending Invoices</h3>
          <p className="text-2xl font-bold text-gray-700">€0.00</p>
          <span className="text-sm text-gray-500">Unpaid invoices</span>
        </div>
      </div>
      <div className="mt-10 bg-white p-6 shadow-md rounded-lg">
        <h3 className="text-xl font-bold mb-4">Sales & Expenses</h3>
        <div className="flex justify-between">
          <div className="w-full h-48 bg-gray-200 rounded">
            {/* Placeholder for a chart */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
