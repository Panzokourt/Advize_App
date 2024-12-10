import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import TaskIcon from "@mui/icons-material/Task";
import ServiceIcon from "@mui/icons-material/Category";

const drawerWidth = 240;

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Clients", icon: <PeopleIcon />, path: "/clients" },
    { text: "Services", icon: <ServiceIcon />, path: "/services" },
    { text: "Tasks", icon: <TaskIcon />, path: "/tasks" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          top: "64px", // Adjust for Header height
          height: "calc(100% - 64px)", // Prevent overlapping the Footer
          overflow: "auto",
        },
      }}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#e3f2fd",
                "& .MuiListItemIcon-root": { color: "#6200ea" },
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
