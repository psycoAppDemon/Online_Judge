import axios from "axios";
import { useState, useEffect } from "react";
import FormInput from "../components/FormInput.jsx";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const User = () => {
  const [inputValues, setInputValues] = useState({
    firstName: {
      type: "text",
      placeHolder: "First Name",
      id: "firstName",
      error: "",
    },
    lastName: {
      type: "text",
      placeHolder: "Last Name",
      id: "lastName",
      error: "",
    },
    userId: {
      type: "text",
      placeHolder: "User Id",
      id: "userId",
      error: "",
    },
    email: {
      type: "email",
      placeHolder: "Email",
      id: "email",
      error: "",
    },
    password: {
      type: "password",
      placeHolder: "Password",
      id: "password",
      error: "",
    },
  });

  // don't change this
  const [placeHolder] = useState("");

  // Handler for changes in subcomponents
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const validateInputs = {
    firstName: (value) => value.length > 0,
    lastName: (value) => value.length > 0,
    userId: (value) => value.length > 0,
    email: (value) => value.length > 0 && /\S+@\S+\.\S+/.test(value),
    password: (value) => value.length > 0,
  };

  useEffect(()=>{
    if(validateInputs.firstName && validateInputs.lastName && validateInputs.email, validateInputs.userId && validateInputs.password){

    }
  },[inputValues]);
  const handleSignUp = async () => {
    if (validateInputs()) {
      try {
        const response = await axios.post("http://localhost:3050/register", {
          firstname: inputValues.firstName,
          lastname: inputValues.lastName,
          password: inputValues.password,
          userId: inputValues.userId,
          email: inputValues.email,
        });
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    }
  };

  const handleSignIn = async () => {}

  //console.log(inputValues["firstName"].id);
  return (
    //<ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {(Object.keys(inputValues)).map((inputState) => (
              <FormInput
                key={inputState}
                inputState={inputState}
                onInputChangeHandler={handleInputChange}
                inputValues={inputValues}
                placeHolderDummy={placeHolder}
                validateInputs={validateInputs}
              />
            ))}
          </Grid>
          <Button
            id="signUpButton"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
          <Button
            id="signInButton"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSignIn}
            hidden
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    //</ThemeProvider>
  );
};

export default User;
