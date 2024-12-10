import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Table, Modal, Form } from "react-bootstrap";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://advizeapp-0bd9740bb742.herokuapp.com";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", status: "Pending" });
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/tasks/?company_id=1`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        await axios.put(`${BACKEND_URL}/api/v1/tasks/${editingTask.id}`, formData);
      } else {
        await axios.post(`${BACKEND_URL}/api/v1/tasks/`, { ...formData, company_id: 1 });
      }
      setFormData({ title: "", description: "", status: "Pending" });
      setEditingTask(null);
      setShowModal(false);
      fetchTasks();
    } catch (error) {
      console.error("Error saving task:", error.message);
    }
  };

  const handleEdit = (task) => {
    setFormData(task);
    setEditingTask(task);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col>
          <h2>Tasks</h2>
          <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>
            Add Task
          </Button>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>
                    <span
                      className={`badge ${
                        task.status === "Completed"
                          ? "bg-success"
                          : task.status === "In Progress"
                          ? "bg-warning"
                          : "bg-secondary"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td>
                    <Button variant="warning" onClick={() => handleEdit(task)} className="me-2">
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(task.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingTask ? "Edit Task" : "Add Task"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                required
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </Form.Select>
            </Form.Group>
            <Button type="submit" variant="primary">
              {editingTask ? "Update Task" : "Add Task"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Tasks;
