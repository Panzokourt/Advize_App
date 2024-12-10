import React from "react";
import { Nav } from "react-bootstrap";

const Sidebar = () => {
  return (
    <Nav defaultActiveKey="/dashboard" className="flex-column">
      <Nav.Link href="/dashboard">Dashboard</Nav.Link>
      <Nav.Link href="/clients">Clients</Nav.Link>
      <Nav.Link href="/services">Services</Nav.Link>
      <Nav.Link href="/tasks">Tasks</Nav.Link>
    </Nav>
  );
};

export default Sidebar;
