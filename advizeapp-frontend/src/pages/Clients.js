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

// Dynamic backend URL (uses environment variable or default fallback)
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://advizeapp-0bd9740bb742.herokuapp.com";

const Clients = () => {
  // State for clients and form data
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    vat_number: "",
    phone: "",
  });
  const [editingClient, setEditingClient] = useState(null); // To track editing

  const [filters, setFilters] = useState({
    company_id: 1, // Default company ID
    name: "",
    email: "",
    vat_number: "",
  }); // Filters for search

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Fetch clients with optional filters
  const fetchClients = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/clients/`, {
        params: filters, // Apply search filters
      });
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error.response?.data || error.message);
    }
  };

  // Fetch clients on component mount and when filters change
  useEffect(() => {
    fetchClients();
  }, [filters]);

  // Handle form submission for create/update
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
          { ...formData, company_id: filters.company_id }
        );
        setClients((prev) => [...prev, response.data]);
      }
      setFormData({ name: "", email: "", vat_number: "", phone: "" });
    } catch (error) {
      console.error("Error saving client:", error.response?.data || error.message);
    }
  };

  // Edit a client
  const handleEdit = (client) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      email: client.email,
      vat_number: client.vat_number,
      phone: client.phone,
    });
  };

  // Delete a client
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/clients/${id}`);
      setClients((prev) => prev.filter((client) => client.id !== id));
    } catch (error) {
      console.error("Error deleting client:", error.response?.data || error.message);
    }
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ padding: isSmallScreen ? 1 : 2 }}>
      <Typography variant="h4" gutterBottom>
        Clients
      </Typography>

      {/* Filter Section */}
      <Paper sx={{ padding: isSmallScreen ? 1 : 2, marginBottom: 2 }}>
        <Typography variant="h6">Search Filters</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              value={filters.name}
              onChange={handleFilterChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Email"
              name="email"
              fullWidth
              value={filters.email}
              onChange={handleFilterChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="VAT Number"
              name="vat_number"
              fullWidth
              value={filters.vat_number}
              onChange={handleFilterChange}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={fetchClients}
          sx={{ marginTop: 2 }}
        >
          Apply Filters
        </Button>
      </Paper>

      {/* Add/Edit Client Section */}
      <Paper sx={{ padding: isSmallScreen ? 1 : 2, marginBottom: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                fullWidth
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                fullWidth
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
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
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth={isSmallScreen}
              >
                {editingClient ? "Update Client" : "Add Client"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Clients List Section */}
      <Grid container spacing={isSmallScreen ? 1 : 2}>
        {clients.map((client) => (
          <Grid item xs={12} sm={6} md={4} key={client.id}>
            <Paper sx={{ padding: isSmallScreen ? 1 : 2 }}>
              <Typography variant="h6">{client.name}</Typography>
              <Typography variant="body2">{client.email}</Typography>
              <Typography variant="body2">VAT: {client.vat_number}</Typography>
              <Typography variant="body2">Phone: {client.phone}</Typography>
              <Box
                sx={{ marginTop: 1, textAlign: isSmallScreen ? "center" : "left" }}
              >
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
