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
  const [data, setData] = useState({
    totalClients: 0,
    totalTasks: 0,
    totalServices: 0,
    taskStatus: {},
    taskDateSummary: {},
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const companyId = 1; // Example company ID
      try {
        const [clients, tasks, services, taskDateSummary, recentTasks, serviceRevenue] =
          await Promise.all([
            axios.get(`${BACKEND_URL}/api/v1/clients/summary/`, {
              params: { company_id: companyId },
            }),
            axios.get(`${BACKEND_URL}/api/v1/tasks/status-summary/`, {
              params: { company_id: companyId },
            }),
            axios.get(`${BACKEND_URL}/api/v1/services/summary/`, {
              params: { company_id: companyId },
            }),
            axios.get(`${BACKEND_URL}/api/v1/tasks/status-summary-by-date/`, {
              params: { company_id: companyId },
            }),
            axios.get(`${BACKEND_URL}/api/v1/tasks/recent-completions/`, {
              params: { company_id: companyId },
            }),
            axios.get(`${BACKEND_URL}/api/v1/services/revenue-summary/`, {
              params: { company_id: companyId },
            }),
          ]);

        setData({
          totalClients: clients.data.total_clients || 0,
          totalTasks: tasks.data["In Progress"] || 0,
          totalServices: services.data.total_services || 0,
          taskStatus: tasks.data,
          taskDateSummary: taskDateSummary.data,
          recentTasks: recentTasks.data,
          serviceRevenue: serviceRevenue.data.total_revenue || 0,
        });
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const chartData = {
    labels: Object.keys(data.taskStatus),
    datasets: [
      {
        label: "Task Status",
        data: Object.values(data.taskStatus),
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
          <Typography variant="h4">{data.totalClients}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper sx={{ padding: "20px", textAlign: "center" }}>
          <Typography>Total Tasks</Typography>
          <Typography variant="h4">{data.totalTasks}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper sx={{ padding: "20px", textAlign: "center" }}>
          <Typography>Total Services</Typography>
          <Typography variant="h4">{data.totalServices}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper sx={{ padding: "20px", textAlign: "center" }}>
          <Typography>Service Revenue</Typography>
          <Typography variant="h4">${data.serviceRevenue.toFixed(2)}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ padding: "20px" }}>
          <Typography>Task Overview</Typography>
          <Bar data={chartData} />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ padding: "20px" }}>
          <Typography>Task Date Summary</Typography>
          <pre>{JSON.stringify(data.taskDateSummary, null, 2)}</pre>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
