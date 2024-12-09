import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Grid, Paper, CircularProgress } from "@mui/material";

// Dynamic backend URL from environment variable or fallback
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://advizeapp-0bd9740bb742.herokuapp.com";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/services/?company_id=1`);
        setServices(response.data);
      } catch (err) {
        console.error("Error fetching services:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return loading ? (
    <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
      <CircularProgress />
    </Grid>
  ) : (
    <Grid container spacing={3} sx={{ marginTop: "10px" }}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Services
        </Typography>
      </Grid>
      {services.map((service) => (
        <Grid item xs={12} sm={6} md={4} key={service.id}>
          <Paper sx={{ padding: "20px", textAlign: "center" }}>
            <Typography variant="h6">{service.name}</Typography>
            <Typography variant="body2">{service.description}</Typography>
            <Typography variant="body2">Price: ${service.price.toFixed(2)}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default Services;
