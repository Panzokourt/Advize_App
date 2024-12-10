import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Table } from "react-bootstrap";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://advizeapp-0bd9740bb742.herokuapp.com";

const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalClients: 0,
    totalServices: 0,
    totalRevenue: 0,
    taskStatus: [],
  });

  const fetchDashboardData = async () => {
    try {
      const [clientsRes, servicesRes, revenueRes, tasksRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/api/v1/clients/summary/?company_id=1`),
        axios.get(`${BACKEND_URL}/api/v1/services/summary/?company_id=1`),
        axios.get(`${BACKEND_URL}/api/v1/services/revenue-summary/?company_id=1`),
        axios.get(`${BACKEND_URL}/api/v1/tasks/status-summary/?company_id=1`),
      ]);

      setSummary({
        totalClients: clientsRes.data.total_clients || 0,
        totalServices: servicesRes.data.total_services || 0,
        totalRevenue: revenueRes.data.total_revenue || 0,
        taskStatus: tasksRes.data || [],
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error.message);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col lg={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Clients</Card.Title>
              <h3>{summary.totalClients}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Services</Card.Title>
              <h3>{summary.totalServices}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Revenue</Card.Title>
              <h3>${summary.totalRevenue.toFixed(2)}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Task Status Overview</Card.Title>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Count</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(summary.taskStatus).map(([status, count]) => (
                    <tr key={status}>
                      <td>{status}</td>
                      <td>{count}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
