import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Grid, Paper, CircularProgress } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://advizeapp-0bd9740bb742.herokuapp.com";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalClients: 0,
    totalTasks: 0,
    totalServices: 0,
    totalRevenue: 0,
    taskStatus: {},
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [clientsRes, tasksRes, servicesRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/v1/dashboard/clients/summary/`),
          axios.get(`${BACKEND_URL}/api/v1/dashboard/tasks/status-summary/`),
          axios.get(`${BACKEND_URL}/api/v1/dashboard/services/summary/`),
        ]);

        setDashboardData({
          totalClients: clientsRes.data.total_clients || 0,
          totalTasks: Object.values(tasksRes.data).reduce((a, b) => a + b, 0),
          totalServices: servicesRes.data.total_services || 0,
          totalRevenue: servicesRes.data.total_cost || 0,
          taskStatus: tasksRes.data || {},
        });
      } catch (err) {
        console.error("Error fetching dashboard data:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const chartData = {
    labels: Object.keys(dashboardData.taskStatus),
    datasets: [
      {
        label: "Task Status",
        data: Object.values(dashboardData.taskStatus),
        backgroundColor: ["#3f51b5", "#f50057", "#00c853"],
      },
    ],
  };

  return loading ? (
    <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
      <CircularProgress />
    </Grid>
  ) : (
    <Grid container spacing={3} sx={{ marginTop: "10px" }}>
      <Grid item xs={3}>
        <Paper sx={{ padding: "20px", textAlign: "center" }}>
          <Typography>Total Clients</Typography>
          <Typography variant="h4">{dashboardData.totalClients}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper sx={{ padding: "20px", textAlign: "center" }}>
          <Typography>Total Tasks</Typography>
          <Typography variant="h4">{dashboardData.totalTasks}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper sx={{ padding: "20px", textAlign: "center" }}>
          <Typography>Total Services</Typography>
          <Typography variant="h4">{dashboardData.totalServices}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper sx={{ padding: "20px", textAlign: "center" }}>
          <Typography>Service Revenue</Typography>
          <Typography variant="h4">${dashboardData.totalRevenue.toFixed(2)}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ padding: "20px" }}>
          <Typography>Task Status Overview</Typography>
          <Bar data={chartData} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
