import { useState, useEffect } from "react";
import FormInput from "../components/FormInput.jsx";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { Container, CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Typography from "@mui/material/Typography";
import DialogActions from "@mui/material/DialogActions";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getInputStates } from "../utility/UserInputList.js";
import { NavLink } from "react-router-dom";
import { loginThunk, signupThunk } from "../redux/thunks/authThunks.js";
import { logout } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
const User = ({ onClose, loginStatus }) => {
  const dispatch = useDispatch();
  const { loading, error, userId } = useSelector((state) => state.auth);
  const [isSignUp, setIsSignUp] = useState(true);
  const [inputValues, setInputValues] = useState(getInputStates);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const [isValidInput, setIsValidInput] = useState(false);
  useEffect(() => {
    const tempIsValidInput =
      validateInputs.email(inputValues.email) &&
      validateInputs.password(inputValues.password);

    if (!isSignUp) {
      setIsValidInput(tempIsValidInput);
    } else {
      setIsValidInput(
        tempIsValidInput &&
          validateInputs.firstName(inputValues.firstName) &&
          validateInputs.lastName(inputValues.lastName) &&
          validateInputs.userId(inputValues.userId)
      );
    }
  }, [inputValues, isSignUp]);

  const validateInputs = {
    firstName: (value) => value.length > 0,
    lastName: (value) => value.length > 0,
    userId: (value) => value.length > 0,
    email: (value) => value.length > 0 && /\S+@\S+\.\S+/.test(value),
    password: (value) => value.length > 0,
  };

  const [placeHolder] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsSubmitClicked(true);
    try {
      await dispatch(
        signupThunk({
          firstname: inputValues.firstName,
          lastname: inputValues.lastName,
          userId: inputValues.userId,
          email: inputValues.email,
          password: inputValues.password,
        })
      );
    } catch (err) {
      console.log("Error in dispatch for Register", err);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsSubmitClicked(true);
    try {
      await dispatch(
        loginThunk({
          email: inputValues.email,
          password: inputValues.password,
        })
      );
    } catch (err) {
      console.log("Error in dispatch for login", err);
    }
  };
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  useEffect(() => {
    if (userId) {
      setIsSuccess(true);
      setIsFailed(false);
    } else if (error) {
      setIsSuccess(false);
      setIsFailed(true);
      setErrorMessage(error.message);
    }
    setIsSubmitClicked(false);
  }, [loading, userId, error]);
  useEffect(() => {
    if (userId) {
      setIsSuccess(true);
      setIsFailed(false);
    } else if (error) {
      setIsSuccess(false);
      setIsFailed(true);
      setErrorMessage(error.message);
    }
    setIsSubmitClicked(false);
  }, [loading, userId, error]);

  const handleLogout = ()=>{
    dispatch(logout());
  }
  console.log(loginStatus);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 6,
          marginBottom: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: isSuccess ? "green" : "secondary.main" }}>
          {isSuccess ? <CheckCircleOutlineIcon /> : <LockOutlinedIcon />}
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          color={isSuccess ? "green" : "black"}
        >
          {isSuccess ? "Success!" : isSignUp ? "Sign Up" : "Sign In"}
        </Typography>
        {isSuccess ? (
          <Typography variant="h6" sx={{ mt: 3 }}>
            {loginStatus
              ? handleLogout() || "Logout successful!"
              : (isSignUp
              ? "Registration successful!"
              : "Login successful!")}
          </Typography>
        ) : (
          <>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                {Object.keys(inputValues).map((inputState) => (
                  <FormInput
                    key={inputState}
                    inputState={inputState}
                    onInputChangeHandler={handleInputChange}
                    inputValues={inputValues}
                    placeHolderDummy={placeHolder}
                    validateInputs={validateInputs}
                    isSignUp={isSignUp}
                  />
                ))}
              </Grid>
              <DialogActions>
                {isSignUp ? (
                  <>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={(e) => handleSignUp(e)}
                      disabled={!isValidInput || loading}
                    >
                      {loading ? <CircularProgress size={24} /> : "Sign Up"}
                    </Button>
                    <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
                      <Grid item>
                        <NavLink
                          component="button"
                          variant="body2"
                          onClick={() => {
                            setIsSignUp(!isSignUp);
                          }}
                        >
                          Already have an account? Sign in
                        </NavLink>
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={(e) => handleSignIn(e)}
                      disabled={!isValidInput || loading}
                    >
                      {loading ? <CircularProgress size={24} /> : "Sign In"}
                    </Button>
                    <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
                      <Grid item>
                        <NavLink
                          component="button"
                          variant="body2"
                          onClick={() => {
                            setIsSignUp(!isSignUp);
                          }}
                        >
                          Don't have an account? Sign up!
                        </NavLink>
                      </Grid>
                    </Grid>
                  </>
                )}
              </DialogActions>
            </Box>
            <Collapse in={isFailed}>
              <Alert severity="error" sx={{ mt: 2 }}>
                {errorMessage || "An error occurred. Please try again."}
              </Alert>
            </Collapse>
          </>
        )}
      </Box>
    </Container>
  );
};

export default User;
