import React from "react";
import { Navbar, Container } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">AdvizeApp</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
