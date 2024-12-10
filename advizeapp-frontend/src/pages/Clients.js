import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://advizeapp-0bd9740bb742.herokuapp.com";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", vat_number: "", phone: "" });
  const [editingClient, setEditingClient] = useState(null);

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/clients/`);
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error.message);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingClient) {
        await axios.put(`${BACKEND_URL}/api/v1/clients/${editingClient.id}`, formData);
      } else {
        await axios.post(`${BACKEND_URL}/api/v1/clients/`, formData);
      }
      setFormData({ name: "", email: "", vat_number: "", phone: "" });
      setEditingClient(null);
      setShowModal(false);
      fetchClients();
    } catch (error) {
      console.error("Error saving client:", error.message);
    }
  };

  const handleEdit = (client) => {
    setFormData(client);
    setEditingClient(client);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/clients/${id}`);
      fetchClients();
    } catch (error) {
      console.error("Error deleting client:", error.message);
    }
  };

  return (
    <Container>
      <h1 className="mt-4">Clients</h1>
      <Button className="mb-3" onClick={() => setShowModal(true)}>
        Add Client
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>VAT Number</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.vat_number}</td>
              <td>{client.phone}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(client)} className="me-2">
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(client.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingClient ? "Edit Client" : "Add Client"}</Modal.Title>
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
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>VAT Number</Form.Label>
              <Form.Control
                type="text"
                value={formData.vat_number}
                onChange={(e) => setFormData({ ...formData, vat_number: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              {editingClient ? "Update Client" : "Add Client"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Clients;
