import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Layout from "../Layout.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginThunk, signupThunk } from "../../store/thunks/authThunks.js";
import CircularProgress from "@mui/material/CircularProgress";
import AuthResult from "./AuthResult.jsx";
import { resetIsAlreadyLoggedIn } from "../../store/slices/authSlice.js";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignIn = () => {
  
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [signInCard, setSignInCard] = React.useState(true);
  const [signUpCard, setSignUpCard] = React.useState(false);
  const [firstnameError, setFirstnameError] = React.useState(false);
  const [lastnameError, setLastnameError] = React.useState(false);
  const [userIdError, setUserIdError] = React.useState(false);
  const [firstnameErrorMessage, setFirstnameErrorMessage] =
    React.useState(false);
  const [lastnameErrorMessage, setLastnameErrorMessage] = React.useState(false);
  const [userIdErrorMessage, setUserIdErrorMessage] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  React.useEffect(()=>{
    dispatch(resetIsAlreadyLoggedIn());
  });

  const handleSubmit = (event) => {
    
  };

  const handleSignInButtonClicked = async () => {
    const { isValid, data } = validateSignInInputs();
    if (isValid) {
      try {
        const response = await dispatch(
          loginThunk({ email: data.email.value, password: data.password.value })
        ).unwrap();
        console.log("Sign In successful:", response);
        navigate("/home");
      } catch (error) {
      //console.log("Sign In failed:", error);
      }
    }
  };

  const handleSignUpButtonClicked = async () => {
    const { isValid, data } = validateSignUpInputs();
    if (isValid) {
      try {
        const response = await dispatch(
          signupThunk({
            firstname: data.firstname.value,
            lastname: data.lastname.value,
            userId: data.userId.value,
            email: data.email.value,
            password: data.password.value,
          })
        ).unwrap();
        console.log("SignUp successful:", response);
        navigate("/");
        //handleSignInButtonClicked();
      } catch (error) {
        //console.error("SignUp failed:", error.message);
      }
    }
  };

  function validateSignInInputs() {
    const data = getInputData();
    let isValid = true;

    if (!data.email.value || !/\S+@\S+\.\S+/.test(data.email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!data.password.value || data.password.value.length < 1) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return { isValid, data };
  }

  function getInputData() {
    return {
      email: document.getElementById("email"),
      password: document.getElementById("password"),
      firstname: document.getElementById("firstname"),
      lastname: document.getElementById("lastname"),
      userId: document.getElementById("userid"),
    };
  }

  function validateSignUpInputs() {
    const data = getInputData();
    let isValid = true;

    // Validate email
    if (!data.email.value || !/\S+@\S+\.\S+/.test(data.email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    // Validate password
    if (!data.password.value || data.password.value.length < 1) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    // Validate first name - only letters allowed, no spaces or special characters
    if (!data.firstname.value) {
      setFirstnameError(true);
      setFirstnameErrorMessage("First name cannot be empty!");
      isValid = false;
    } else {
      setFirstnameError(false);
      setFirstnameErrorMessage("");
    }

    // Validate last name - only letters allowed, no spaces or special characters
    if (!data.lastname.value) {
      setLastnameError(true);
      setLastnameErrorMessage("Last name cannot be empty!");
      isValid = false;
    } else {
      setLastnameError(false);
      setLastnameErrorMessage("");
    }

    // Validate user ID - no spaces allowed
    if (!data.userId.value || /\s/.test(data.userId.value)) {
      setUserIdError(true);
      setUserIdErrorMessage("User ID should not contain spaces.");
      isValid = false;
    } else {
      setUserIdError(false);
      setUserIdErrorMessage("");
    }

    return { isValid, data };
  }

  const handleSignUpTextClicked = () => {
    setSignInCard(false);
    setSignUpCard(true);
  };

  const handleSignInTextClicked = () => {
    setSignUpCard(false);
    setSignInCard(true);
  };

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 12,
        }}
      >
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            {signInCard ? "Sign in" : "Sign Up"}
          </Typography>
          {loading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress disableShrink sx={{color: "black"}}/>
            </Box>
          )}
          {!loading && (
            <Box
              onSubmit={handleSubmit}
              noValidate
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 2,
              }}
            >
              {signUpCard && (
                <Box sx={{ display: "flex", gap: 2 }}>
                  <FormControl>
                    <FormLabel htmlFor="text">First Name</FormLabel>
                    <TextField
                      error={firstnameError}
                      helperText={firstnameErrorMessage}
                      id="firstname"
                      type="text"
                      name="firstname"
                      placeholder="Harry"
                      required
                      fullWidth
                      variant="outlined"
                      color="primary"
                    />
                  </FormControl>{" "}
                  <FormControl>
                    <FormLabel htmlFor="text">Last Name</FormLabel>
                    <TextField
                      error={lastnameError}
                      helperText={lastnameErrorMessage}
                      id="lastname"
                      type="text"
                      name="lastname"
                      placeholder="Potter"
                      required
                      fullWidth
                      variant="outlined"
                      color="primary"
                    />
                  </FormControl>
                </Box>
              )}

              <Box sx={{ display: "flex", gap: 2 }}>
                {signUpCard && (
                  <FormControl sx={{ display: "flex", flex: 1 }}>
                    <FormLabel htmlFor="text">User Id</FormLabel>
                    <TextField
                      error={userIdError}
                      helperText={userIdErrorMessage}
                      id="userid"
                      type="text"
                      name="userId"
                      placeholder="beingBeast_007"
                      required
                      fullWidth
                      variant="outlined"
                      color="primary"
                    />
                  </FormControl>
                )}
                <FormControl sx={{ display: "flex", flex: 1 }}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <TextField
                    error={emailError}
                    helperText={emailErrorMessage}
                    id="email"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    autoComplete="email"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    color={emailError ? "error" : "primary"}
                    sx={{ ariaLabel: "email" }}
                  />
                </FormControl>
              </Box>
              <FormControl>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                </Box>
                <TextField
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={passwordError ? "error" : "primary"}
                />
              </FormControl>
              {signInCard && (
                <Button
                  fullWidth
                  disabled={loading}
                  variant="contained"
                  onClick={handleSignInButtonClicked}
                  sx={{ mt: 1 }}
                >
                  Sign in
                </Button>
              )}
              {signUpCard && (
                <Button
                  fullWidth
                  disabled={loading}
                  variant="contained"
                  onClick={handleSignUpButtonClicked}
                  sx={{ mt: 1 }}
                >
                  Sign Up
                </Button>
              )}
              {signInCard && (
                <Typography sx={{ textAlign: "center" }}>
                  Don&apos;t have an account?{" "}
                  <span
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={handleSignUpTextClicked}
                  >
                    Sign up
                  </span>
                </Typography>
              )}
              {signUpCard && (
                <Typography sx={{ textAlign: "center" }}>
                  Already have an account?{" "}
                  <span
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={handleSignInTextClicked}
                  >
                    Sign In
                  </span>
                </Typography>
              )}
            </Box>
          )}
          
        </Card>
        <AuthResult></AuthResult>
      </Box>
    </Layout>
  );
};

export default SignIn;
