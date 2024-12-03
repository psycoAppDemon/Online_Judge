import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Card, Typography, Divider, Button } from "@mui/material";
import Layout from "./Layout";
import { signoutThunk } from "../store/thunks/authThunks";

const Profile = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOutButtonClicked = async () => {
    try {
      const response = await dispatch(signoutThunk({})).unwrap();
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.log(`Error while logging out: ${JSON.stringify(error)}`);
    }
  };
  return (
    <Layout>
      {
        isAuthenticated &&
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 12,
            minHeight: "50vh",
          }}
        >
          <Card variant="outlined" sx={{ p: 3, maxWidth: 400, width: "100%" }}>
            <Typography
              component="h1"
              variant="h4"
              sx={{
                width: "100%",
                fontSize: "clamp(2rem, 10vw, 2.15rem)",
                textAlign: "center",
                mb: 2,
              }}
            >
              Profile
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>User ID:</strong> {user.userId}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Email:</strong> {user.email}
            </Typography>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSignOutButtonClicked}
              sx={{ mt: 1 }}
            >
              Sign Out
            </Button>
          </Card>
        </Box>
      }
    </Layout>
  );
};

export default Profile;
