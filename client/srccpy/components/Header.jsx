import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
    List,
    ListItem,
    Paper,
    Typography,
    Box,
    CssBaseline,
    IconButton,
    Stack,
    Grid,
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Dialog,
    Switch,
  } from "@mui/material";
export default function Header() {

  const [userId,setUserId] = useState("abc");
  const [checked,setChecked] = useState(false); 
  const [role,setRole] = useState("user");
  
  const handleChange = () => {

  }

  const handleOpenUserDialog = () => {

  }

  const handleAddNewProblem = () =>{

  }
  const getCookie = () =>{
    
  }
  
  return (
    <>
      <Snackbar
        // open={openSnackbar}
        autoHideDuration={4000}
        // onClose={handleCloseSnackBar}
        // message={snackbarMessage}
        
      />
      <CssBaseline />
      <Box
          sx={{
            position: "sticky",
            zIndex: 1000,
            padding: "8px 16px",
            backgroundColor: "#1f1f1f",
            color: "#FFD700",
            top: 0,
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" alignItems="center">
              <IconButton color="inherit" sx={{ fontSize: 56 }}>
                <AccountCircleSharpIcon fontSize="inherit" />
              </IconButton>
              <Typography sx={{ color: "#FFD700" }}>
                {userId ? userId : "New User"}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
              <Typography sx={{ color: "#FFD700", marginRight: 1 }}>
                {checked ? `OPEN PROBLEM PANEL` : `HIDE PROBLEM PANEL`}
              </Typography>
              <Switch
                onChange={handleChange}
                checked={checked}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#FFD700",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "#FFD700",
                  },
                }}
              />
              {role === "admin" && (
                <Button
                  variant="text"
                  onClick={handleAddNewProblem}
                  sx={{ color: "inherit" }}
                >
                  Add New Problem
                </Button>
              )}
              {getCookie("token") ? (
                <Button
                  variant="text"
                  onClick={handleOpenUserDialog}
                  sx={{ color: "inherit" }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  variant="text"
                  onClick={handleOpenUserDialog}
                  sx={{ color: "inherit" }}
                >
                  Login
                </Button>
              )}
            </Stack>
          </Stack>
        </Box>
    </>
  );
}
