import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { Outlet, useNavigate } from "react-router-dom";
import axiosInstance from "../AxiosInstance";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

const drawerWidth = 240;

const AdminPage = () => {
  const { isLoggedIn, isAdmin } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(isLoggedIn);
    if (isLoggedIn && !isAdmin) {
      navigate("/");
      console.log("Not Admin");
    }
  }, [isLoggedIn, isAdmin, navigate]);

  if (!isLoggedIn || !isAdmin) {
    return null;
  }

  const handleLogOut = async () => {
    await axiosInstance
      .delete("/auth/logout")
      .then(() => {})
      .catch((error) => {
        console.error(error);
      })
      .finally(async () => {
        dispatch(logout());
        navigate("/");
      });
  };

  const handleItemClick = async (itemText) => {
    switch (itemText) {
      case "LogOut":
        await handleLogOut();
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Admin Panel
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {[
            { text: "Dashboard", icon: <DashboardIcon /> },
            { text: "Products", icon: <PeopleIcon /> },
            { text: "LogOut", icon: <SettingsIcon /> },
          ].map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => handleItemClick(item.text)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${drawerWidth}px)`,
          display: "flex",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminPage;
