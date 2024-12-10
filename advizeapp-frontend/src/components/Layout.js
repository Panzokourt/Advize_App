import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Container fluid>
        <Row>
          <Col md={2} className="sidebar">
            <Sidebar />
          </Col>
          <Col md={10}>
            <main>{children}</main>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Layout;
