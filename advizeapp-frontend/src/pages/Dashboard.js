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

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "https://advizeapp-0bd9740bb742.herokuapp.com";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalClients: 0,
    totalTasks: 0,
    totalServices: 0,
    taskStatus: {},
    recentTasks: [],
    serviceRevenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const companyId = 1; // Default company_id, αν υπάρχει ανάγκη μπορεί να γίνει δυναμικό
      try {
        const [clientsRes, tasksRes, servicesRes, revenueRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/v1/clients/summary/`, {
            params: { company_id: companyId },
          }),
          axios.get(`${BACKEND_URL}/api/v1/tasks/status-summary/`, {
            params: { company_id: companyId },
          }),
          axios.get(`${BACKEND_URL}/api/v1/services/summary/`, {
            params: { company_id: companyId },
          }),
          axios.get(`${BACKEND_URL}/api/v1/services/revenue-summary/`, {
            params: { company_id: companyId },
          }),
        ]);

        setDashboardData({
          totalClients: clientsRes.data.total_clients || 0,
          totalTasks: tasksRes.data["In Progress"] || 0,
          totalServices: servicesRes.data.total_services || 0,
          taskStatus: tasksRes.data,
          recentTasks: [],
          serviceRevenue: revenueRes.data.total_revenue || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <CircularProgress />
    </Grid>
  ) : (
    <Grid container spacing={3} sx={{ marginTop: "10px" }}>
      <Grid item xs={4}>
        <Paper sx={{ padding: "20px", textAlign: "center" }}>
          <Typography>Total Clients</Typography>
          <Typography variant="h4">{dashboardData.totalClients}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper sx={{ padding: "20px", textAlign: "center" }}>
          <Typography>Total Tasks</Typography>
          <Typography variant="h4">{dashboardData.totalTasks}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper sx={{ padding: "20px", textAlign: "center" }}>
          <Typography>Total Services</Typography>
          <Typography variant="h4">{dashboardData.totalServices}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper sx={{ padding: "20px", textAlign: "center" }}>
          <Typography>Service Revenue</Typography>
          <Typography variant="h4">
            ${dashboardData.serviceRevenue.toFixed(2)}
          </Typography>
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
