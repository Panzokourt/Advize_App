import React from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';

const Tasks = () => {
  return (
    <Container fluid>
      <Row className="mt-4">
        <Col>
          <h2>Tasks</h2>
          <Button variant="primary" className="mb-3">
            Add Task
          </Button>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Replace this sample data with your API calls */}
              <tr>
                <td>Task A</td>
                <td>
                  <span className="badge bg-success">Completed</span>
                </td>
                <td>12/31/2023</td>
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

export default Tasks;
