import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://advizeapp-0bd9740bb742.herokuapp.com";

const Services = () => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "", price: "" });
  const [editingService, setEditingService] = useState(null);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/services/?company_id=1`);
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error.message);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingService) {
        await axios.put(`${BACKEND_URL}/api/v1/services/${editingService.id}`, formData);
      } else {
        await axios.post(`${BACKEND_URL}/api/v1/services/`, { ...formData, company_id: 1 });
      }
      setFormData({ name: "", description: "", price: "" });
      setEditingService(null);
      setShowModal(false);
      fetchServices();
    } catch (error) {
      console.error("Error saving service:", error.message);
    }
  };

  const handleEdit = (service) => {
    setFormData(service);
    setEditingService(service);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/services/${id}`);
      fetchServices();
    } catch (error) {
      console.error("Error deleting service:", error.message);
    }
  };

  return (
    <Container>
      <h1 className="my-4">Services</h1>
      <Button className="mb-3" onClick={() => setShowModal(true)}>
        Add Service
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.name}</td>
              <td>{service.description}</td>
              <td>${service.price.toFixed(2)}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(service)} className="me-2">
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(service.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingService ? "Edit Service" : "Add Service"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              {editingService ? "Update Service" : "Add Service"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Services;
