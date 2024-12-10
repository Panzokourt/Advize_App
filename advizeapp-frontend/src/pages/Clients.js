import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Table, Button, Form, Modal } from "react-bootstrap";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newClient, setNewClient] = useState({ name: "", email: "", vat: "", phone: "" });
  const [editClient, setEditClient] = useState(null);

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/clients`);
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleAddClient = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/clients`, newClient);
      fetchClients();
      setShowModal(false);
    } catch (error) {
      console.error("Error adding client:", error);
    }
  };

  const handleDeleteClient = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/clients/${id}`);
      fetchClients();
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  const handleEditClient = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/clients/${editClient.id}`, editClient);
      fetchClients();
      setEditClient(null);
    } catch (error) {
      console.error("Error editing client:", error);
    }
  };

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col>
          <h2>Clients</h2>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Add Client
          </Button>
          <Table striped bordered hover responsive className="mt-3">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>VAT</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{client.vat}</td>
                  <td>{client.phone}</td>
                  <td>
                    <Button variant="warning" size="sm" onClick={() => setEditClient(client)}>
                      Edit
                    </Button>{" "}
                    <Button variant="danger" size="sm" onClick={() => handleDeleteClient(client.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Modal για προσθήκη πελάτη */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="clientName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={newClient.name}
                onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="clientEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={newClient.email}
                onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="clientVat" className="mt-3">
              <Form.Label>VAT</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter VAT"
                value={newClient.vat}
                onChange={(e) => setNewClient({ ...newClient, vat: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="clientPhone" className="mt-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone"
                value={newClient.phone}
                onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddClient}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal για επεξεργασία πελάτη */}
      {editClient && (
        <Modal show onHide={() => setEditClient(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Client</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="editClientName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editClient.name}
                  onChange={(e) => setEditClient({ ...editClient, name: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="editClientEmail" className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={editClient.email}
                  onChange={(e) => setEditClient({ ...editClient, email: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="editClientVat" className="mt-3">
                <Form.Label>VAT</Form.Label>
                <Form.Control
                  type="text"
                  value={editClient.vat}
                  onChange={(e) => setEditClient({ ...editClient, vat: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="editClientPhone" className="mt-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  value={editClient.phone}
                  onChange={(e) => setEditClient({ ...editClient, phone: e.target.value })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setEditClient(null)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleEditClient}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default Clients;
