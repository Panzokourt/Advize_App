import React from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';

const Services = () => {
  return (
    <Container fluid>
      <Row className="mt-4">
        <Col>
          <h2>Services</h2>
          <Button variant="primary" className="mb-3">
            Add Service
          </Button>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Replace this sample data with your API calls */}
              <tr>
                <td>Service A</td>
                <td>Service Description</td>
                <td>$100</td>
                <td>
                  <Button variant="warning" size="sm" className="me-2">
                    Edit
                  </Button>
                  <Button variant="danger" size="sm">
                    Delete
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Services;
