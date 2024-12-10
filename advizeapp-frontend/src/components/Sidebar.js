import React from "react";
import { Nav } from "react-bootstrap";

const Sidebar = () => {
  return (
    <div className="sidebar bg-light vh-100">
      <Nav className="flex-column p-3">
        <Nav.Link href="/dashboard" className="sidebar-link">
          Dashboard
        </Nav.Link>
        <Nav.Link href="/clients" className="sidebar-link">
          Clients
        </Nav.Link>
        <Nav.Link href="/services" className="sidebar-link">
          Services
        </Nav.Link>
        <Nav.Link href="/tasks" className="sidebar-link">
          Tasks
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
