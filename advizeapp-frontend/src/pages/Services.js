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

const Services = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [editingService, setEditingService] = useState(null);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/services/?company_id=1`);
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingService) {
        const response = await axios.put(
          `${BACKEND_URL}/api/v1/services/${editingService.id}`,
          formData
        );
        setServices((prev) =>
          prev.map((service) =>
            service.id === editingService.id ? response.data : service
          )
        );
        setEditingService(null);
      } else {
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/services/`,
          formData
        );
        setServices((prev) => [...prev, response.data]);
      }
      setFormData({ name: "", description: "", price: "" });
    } catch (error) {
      console.error("Error saving service:", error.response?.data || error.message);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/services/${id}`);
      setServices((prev) => prev.filter((service) => service.id !== id));
    } catch (error) {
      console.error("Error deleting service:", error.response?.data || error.message);
    }
  };

  return (
    <Box sx={{ padding: isSmallScreen ? 1 : 2 }}>
      <Typography variant="h4" gutterBottom>
        Services
      </Typography>
      <Paper sx={{ padding: isSmallScreen ? 1 : 2, marginBottom: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                fullWidth
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Price"
                fullWidth
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth={isSmallScreen}>
                {editingService ? "Update" : "Add"} Service
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Grid container spacing={isSmallScreen ? 1 : 2}>
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Paper sx={{ padding: isSmallScreen ? 1 : 2 }}>
              <Typography variant="h6">{service.name}</Typography>
              <Typography variant="body2">{service.description}</Typography>
              <Typography variant="body2">Price: ${service.price.toFixed(2)}</Typography>
              <Box sx={{ marginTop: 1, textAlign: isSmallScreen ? "center" : "left" }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleEdit(service)}
                  sx={{ marginRight: 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(service.id)}
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

export default Services;
