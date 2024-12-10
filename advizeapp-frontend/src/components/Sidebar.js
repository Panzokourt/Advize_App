import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="brand">AdvizeApp</div>
      <ul className="menu">
        <li className="menu-item">
          <Link to="/dashboard" className="menu-link">Dashboard</Link>
        </li>
        <li className="menu-item">
          <Link to="/clients" className="menu-link">Clients</Link>
        </li>
        <li className="menu-item">
          <Link to="/services" className="menu-link">Services</Link>
        </li>
        <li className="menu-item">
          <Link to="/tasks" className="menu-link">Tasks</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
