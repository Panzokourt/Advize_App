import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col, Container } from "react-bootstrap";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://advizeapp-backend.com";

const Dashboard = () => {
  const [data, setData] = useState({ totalClients: 0, totalTasks: 0, totalServices: 0 });

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
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Clients</Card.Title>
              <Card.Text>{data.totalClients}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Tasks</Card.Title>
              <Card.Text>{data.totalTasks}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Services</Card.Title>
              <Card.Text>{data.totalServices}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
