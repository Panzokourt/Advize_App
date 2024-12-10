import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Services from "./pages/Services";
import Tasks from "./pages/Tasks";

const App = () => {
  return (
    <Router>
      <div id="root" className="app-container">
        <Layout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/services" element={<Services />} />
            <Route path="/tasks" element={<Tasks />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
};

export default App;
