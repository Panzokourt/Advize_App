import React from "react";
import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white p-6 rounded-lg shadow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <h3 className="text-sm text-gray-500">Total Clients</h3>
        <p className="text-2xl font-bold text-purple-700">45</p>
      </motion.div>
      <motion.div
        className="bg-white p-6 rounded-lg shadow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <h3 className="text-sm text-gray-500">Total Services</h3>
        <p className="text-2xl font-bold text-green-500">20</p>
      </motion.div>
      <motion.div
        className="bg-white p-6 rounded-lg shadow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <h3 className="text-sm text-gray-500">Pending Tasks</h3>
        <p className="text-2xl font-bold text-red-500">10</p>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
