import React from "react";
import Sidebar from "./Sidebar";
import RightPanel from "./RightPanel";
import { motion } from "framer-motion";

const Layout = ({ children }) => {
  return (
    <motion.div
      className="flex h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Sidebar />
      <div className="flex-1 bg-white dark:bg-gray-800 p-6 text-gray-900 dark:text-gray-200">
        {children}
      </div>
      <RightPanel />
    </motion.div>
  );
};

export default Layout;
