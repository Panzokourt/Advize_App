import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="col-md-3 col-lg-2 bg-dark text-light p-3 vh-100">
      <h4 className="text-center">Menu</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink className="nav-link text-light" to="/dashboard">
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-light" to="/clients">
            Clients
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-light" to="/services">
            Services
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-light" to="/tasks">
            Tasks
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
