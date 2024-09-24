import React, { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slide,
  Switch,
} from "@mui/material";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CodeEditor from "../components/CodeEditor";
import User from "./User"; // Import User component
import ProblemListItem from "../components/problemListItem";

export default function Home() {
  //const [problems, setProblems] = useState([]);
  const [loginStatus, setLoginStatus] = useState(false);
  const [language, setLanguage] = useState("cpp");
  const [openUserDialog, setOpenUserDialog] = useState(false); // State to manage dialog
  const [isProblemWindowOpened, setIsProblemWindowOpened] = useState(false);
  const [problemData, setProblemData] = useState(null);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [fontSize, setFontSize] = useState(12); // State for font size
  //const [isProblemWindowOpened, setIsProblemWindowOpened] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  const handleProblemClicked = (problem) => {
    setSelectedProblem("Addition of Two Numbers");
    setIsProblemWindowOpened(true);
  };
  const items = [
    "Paper 1",
    "Paper 2",
    "Paper 3",
    "Paper 4",
    "Paper 5",
    "Paper 6",
    "Paper 7",
    "Paper 8",
    "Paper 9",
    "Paper 10",
    "Paper 11",
    "Paper 12",
    "Paper 13",
  ];

  const problems = {
    "Addition of Two Numbers": {
      problemName: "Addition of Two Numbers",
      problemStatement: "Given two integers, return their sum.",
      constraints: "The integers will be in the range -1000 to 1000.",
      IOformatDescription:
        "Input: Two integers separated by a space. Output: A single integer which is the sum of the two integers.",
      input: "8 3",
      output: "11",
      category: "sample",
    },
    "Subtraction of Two Numbers": {
      problemName: "Subtraction of Two Numbers",
      problemStatement: "Given two integers, return their difference.",
      constraints: "The integers will be in the range -1000 to 1000.",
      IOformatDescription:
        "Input: Two integers separated by a space. Output: A single integer which is the difference of the two integers.",
      input: "8 3",
      output: "5",
      category: "sample",
    },
    // Add more problem details here
  };

  // useEffect(() => {
  //   fetch("http://localhost:3050/home")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setProblems(data.responseData);
  //       setLoginStatus(data.loginStatus);
  //     })
  //     .catch((error) => console.error("Error fetching problems:", error));
  // }, []);

  const handleOpenUserDialog = () => {
    setOpenUserDialog(true);
  };

  const handleCloseUserDialog = () => {
    setOpenUserDialog(false);
  };

  // const handleProblemClicked = async () =>{
  //     try {
  //       const response = await axios.get(`http://localhost:3050/${id}`);
  //       setProblemData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching problem data:", error);
  //     }
  //     setIsProblemWindowOpened(true);

  // }

  return (
    <>
      <CssBaseline />
      <Box
        maxWidth="100%"
        sx={{
          position: "relative",
          minHeight: "100vh",
          backgroundColor: "#181818",
        }}
      >
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
              <Button
                variant="text"
                onClick={handleOpenUserDialog}
                sx={{ color: "inherit" }}
              >
                {loginStatus ? "Logout" : "Login"}
              </Button>
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
              <IconButton color="inherit">
                <LogoutIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Box>
        <Grid
          container
          spacing={2}
          sx={{ height: "calc(100vh - 64px)", overflow: "hidden" }}
        >
          {" "}
          {!checked && (
            <Grid
              item
              xs={4}
              sx={{
                height: "100%",
                minHeight: "100vh",
                backgroundColor: "#2c2c2c",
                boxShadow: 2,
                overflowY: "auto",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              {!isProblemWindowOpened && (
                <List
                  sx={{
                    backgroundColor: "#2c2c2c",
                    boxShadow: 2,
                  }}
                >
                  {items.map((item, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "2px",
                        transition: "transform 0.2s, box-shadow 0.2s",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        },
                      }}
                      onClick={handleProblemClicked.bind(
                        null,
                        "Addition of Two Numbers"
                      )}
                    >
                      <Paper
                        elevation={3}
                        sx={{
                          padding: "16px",
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          backgroundColor: "#3d3d3d",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography
                            variant="body1"
                            component="span"
                            sx={{
                              marginRight: "16px",
                              color: "#FFD700",
                              fontFamily: "Aptos Narrow, sans-serif",
                            }}
                          >
                            {index + 1}.
                          </Typography>
                          <Typography
                            variant="body1"
                            component="span"
                            sx={{
                              color: "#FFD700",
                              fontFamily: "Aptos Narrow, sans-serif",
                            }}
                          >
                            {item}
                          </Typography>
                        </Box>
                        <ArrowForwardIosIcon sx={{ color: "#FFD700" }} />
                      </Paper>
                    </ListItem>
                  ))}
                </List>
              )}{" "}
              {isProblemWindowOpened && (
                <Grid
                  item
                  sx={{
                    width: "100%",
                    backgroundColor: "#2c2c2c",
                    boxShadow: 2,
                    marginBottom: "8vh",
                    padding: "8px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      position: "sticky",
                      top: 0, // Keep the header at the top of its container
                      zIndex: 1, // Ensure the header is above other content
                      backgroundColor: "#3d3d3d", // Dark background color
                      padding: "12px", // Padding around the header
                      borderRadius: "4px", // Rounded corners for better UX
                      marginBottom: "8px", // Space between headers if used in a list
                    }}
                  >
                    {/* Back navigation arrow */}
                    <IconButton
                      color="inherit"
                      aria-label="back"
                      sx={{ marginRight: 1, color: "#FFD700" }} // Golden color for the arrow
                    >
                      <ArrowBackIosOutlinedIcon onClick={setIsProblemWindowOpened.bind(
                        null,
                        false
                      )}></ArrowBackIosOutlinedIcon>
                    </IconButton>

                    {/* Problem name as a heading in bold */}
                    <Typography
                      variant="h5"
                      component="h1"
                      sx={{ fontWeight: "bold", color: "#FFD700" }} // Golden color for the problem name
                    >
                      {problems[selectedProblem].problemName}
                    </Typography>
                  </Box>
                  {Object.entries(problems[selectedProblem])
                    .filter(
                      ([key]) => key !== "problemName" && key !== "category"
                    )
                    .map(([key, value]) => (
                      <ProblemListItem
                        accordionSummary={key}
                        accordionDetails={value}
                        key={key}
                      />
                    ))}
                </Grid>
              )}
            </Grid>
          )}
          <Grid
            item
            xs={checked ? 12 : 8}
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                paddingTop: 2,
                paddingLeft: 2,
                paddingRight: 2,
                width: "100%",
                height: "10%",
                backgroundColor: "#1a1a1a",
                gap: 2,
              }}
            >
              <FormControl xs={{ height: "40%" }} fullWidth>
                <InputLabel
                  id="language-select-label"
                  sx={{ color: "#FFD700" }}
                >
                  Language
                </InputLabel>
                <Select
                  labelId="language-select-label"
                  id="language-select"
                  value={language}
                  label="Language"
                  sx={{
                    height: "40%",
                    width: "20%",
                    backgroundColor: "#2c2c2c",
                    color: "#FFD700",
                    "& .MuiSvgIcon-root": {
                      color: "#FFD700",
                    },
                    "& .MuiInputBase-root": {
                      color: "#FFD700",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#FFD700",
                      },
                      "&:hover fieldset": {
                        borderColor: "#FFD700",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#FFD700",
                      },
                    },
                  }}
                >
                  <MenuItem value={"cpp"}>C++</MenuItem>
                  <MenuItem value={"javascript"}>JavaScript</MenuItem>
                  <MenuItem value={"java"}>Java</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#FFD700",
                  color: "#181818",
                  "&:hover": { backgroundColor: "#FFC700" },
                }}
              >
                Run
              </Button>
              {isProblemWindowOpened && (
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#FFD700",
                    color: "#181818",
                    "&:hover": { backgroundColor: "#FFC700" },
                  }}
                >
                  Submit
                </Button>
              )}
            </Box>
            <Box
              sx={{
                height: "50%",
                overflow: "auto",
                backgroundColor: "#1a1a1a",
                padding: 2,
              }}
            >
              <CodeEditor language={language} />
            </Box>

            <Box
              sx={{
                height: "40%",
                backgroundColor: "#1a1a1a",
                padding: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <TextField
                placeholder="Input your data here..."
                multiline
                rows={4}
                variant="outlined"
                sx={{
                  backgroundColor: "#2c2c2c",
                  color: "#FFD700",
                  "& .MuiInputBase-input": { color: "#FFD700" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#FFD700" },
                    "&:hover fieldset": { borderColor: "#FFD700" },
                    "&.Mui-focused fieldset": { borderColor: "#FFD700" },
                  },
                }}
              />
            </Box>
            <Box
              sx={{
                height: "40%",
                backgroundColor: "#1a1a1a",
                padding: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <TextField
                placeholder="Output comes here..."
                multiline
                rows={4}
                variant="outlined"
                sx={{
                  backgroundColor: "#2c2c2c",
                  color: "#FFD700",
                  "& .MuiInputBase-input": { color: "#FFD700" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#FFD700" },
                    "&:hover fieldset": { borderColor: "#FFD700" },
                    "&.Mui-focused fieldset": { borderColor: "#FFD700" },
                  },
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Dialog open={openUserDialog} onClose={handleCloseUserDialog}>
        <User onClose={handleCloseUserDialog} />
      </Dialog>
      <Outlet />
    </>
  );
}
