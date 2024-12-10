import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Services from "./pages/Services";
import Tasks from "./pages/Tasks";

const App = () => {
  return (
    <div id="root">
      <Router>
        <Layout>
          <div className="content">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/services" element={<Services />} />
              <Route path="/tasks" element={<Tasks />} />
            </Routes>
          </div>
        </Layout>
        <footer>
          <p>© 2024 AdvizeApp. All Rights Reserved.</p>
        </footer>
      </Router>
    </div>
  );
};

export default App;
