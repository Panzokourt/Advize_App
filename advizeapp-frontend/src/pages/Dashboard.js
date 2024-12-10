import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://advizeapp-0bd9740bb742.herokuapp.com";

const Dashboard = () => {
  const [data, setData] = useState({
    totalClients: 0,
    totalTasks: 0,
    totalServices: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clients, tasks, services] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/v1/clients/summary/?company_id=1`),
          axios.get(`${BACKEND_URL}/api/v1/tasks/status-summary/?company_id=1`),
          axios.get(`${BACKEND_URL}/api/v1/services/summary/?company_id=1`),
        ]);

        setData({
          totalClients: clients.data.total_clients || 0,
          totalTasks: tasks.data["In Progress"] || 0,
          totalServices: services.data.total_services || 0,
        });
      } catch (err) {
        console.error("Error fetching dashboard data:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <h1 className="my-4">Dashboard</h1>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
          <Spinner animation="border" />
        </div>
      ) : (
        <Row className="g-4">
          <Col md={4}>
            <Card className="text-center">
              <Card.Body>
                <Card.Title>Total Clients</Card.Title>
                <Card.Text as="h3">{data.totalClients}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center">
              <Card.Body>
                <Card.Title>Total Tasks</Card.Title>
                <Card.Text as="h3">{data.totalTasks}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center">
              <Card.Body>
                <Card.Title>Total Services</Card.Title>
                <Card.Text as="h3">{data.totalServices}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Dashboard;
