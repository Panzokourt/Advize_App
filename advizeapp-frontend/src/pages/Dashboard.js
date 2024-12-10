import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const Dashboard = () => {
  return (
    <Container fluid className="mt-4">
      <Row>
        <Col md={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Total Clients</Card.Title>
              <Card.Text>10</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Total Services</Card.Title>
              <Card.Text>25</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Total Tasks</Card.Title>
              <Card.Text>50</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Revenue</Card.Title>
              <Card.Text>$5000</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
