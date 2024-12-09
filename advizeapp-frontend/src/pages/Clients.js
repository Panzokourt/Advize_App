import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";

// Δυναμικό URL για το backend (χρησιμοποιεί περιβαλλοντική μεταβλητή ή default fallback)
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://advizeapp-0bd9740bb742.herokuapp.com";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    vat_number: "",
    phone: "",
  });
  const [editingClient, setEditingClient] = useState(null);

  // Responsive Hook
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Small screen detection

  const fetchClients = async () => {
    try {
      const companyId = 1; // ή από state/authentication
      const response = await axios.get(`${BACKEND_URL}/api/v1/clients/`, {
        params: { company_id: companyId },
      });
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error.response?.data || error.message);
    }
  };
  

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingClient) {
        const response = await axios.put(
          `${BACKEND_URL}/api/v1/clients/${editingClient.id}`,
          formData
        );
        setClients((prev) =>
          prev.map((client) =>
            client.id === editingClient.id ? response.data : client
          )
        );
        setEditingClient(null);
      } else {
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/clients/`,
          formData
        );
        setClients((prev) => [...prev, response.data]);
      }
      setFormData({ name: "", email: "", vat_number: "", phone: "" });
    } catch (error) {
      console.error("Error saving client:", error.response?.data || error.message);
    }
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      email: client.email,
      vat_number: client.vat_number,
      phone: client.phone,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/clients/${id}`);
      setClients((prev) => prev.filter((client) => client.id !== id));
    } catch (error) {
      console.error("Error deleting client:", error.response?.data || error.message);
    }
  };

  return (
    <Box sx={{ padding: isSmallScreen ? 1 : 2 }}>
      <Typography variant="h4" gutterBottom>
        Clients
      </Typography>
      <Paper sx={{ padding: isSmallScreen ? 1 : 2, marginBottom: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                fullWidth
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                fullWidth
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="VAT Number"
                fullWidth
                value={formData.vat_number}
                onChange={(e) =>
                  setFormData({ ...formData, vat_number: e.target.value })
                }
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                fullWidth
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth={isSmallScreen}>
                {editingClient ? "Update" : "Add"} Client
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Grid container spacing={isSmallScreen ? 1 : 2}>
        {clients.map((client) => (
          <Grid item xs={12} sm={6} md={4} key={client.id}>
            <Paper sx={{ padding: isSmallScreen ? 1 : 2 }}>
              <Typography variant="h6">{client.name}</Typography>
              <Typography variant="body2">{client.email}</Typography>
              <Typography variant="body2">VAT: {client.vat_number}</Typography>
              <Typography variant="body2">Phone: {client.phone}</Typography>
              <Box sx={{ marginTop: 1, textAlign: isSmallScreen ? "center" : "left" }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleEdit(client)}
                  sx={{ marginRight: 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(client.id)}
                >
                  Delete
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Clients;
