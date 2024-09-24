import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Snackbar from "@mui/material/Snackbar";
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
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CodeEditor from "../components/CodeEditor";
import User from "./User"; // Import User component
import ProblemListItem from "../components/problemListItem";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../redux/thunks/authThunks";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
export default function Home() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [isProblemWindowOpened, setIsProblemWindowOpened] = useState(false);
  const [problemList, setProblemList] = useState(null);
  const [isLoadingProblem, setIsLoadingProblem] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [checked, setChecked] = useState(false);
  const [code, setCode] = useState();
  const [input, setInput] = useState("Input goes here......");
  const [output, setOutput] = useState();
  const [language, setLanguage] = useState("cpp");
  const [problemId, setProblemId] = useState();
  const dispatch = useDispatch();
  const [problemPanelSize, setProblemPanelSize] = useState(4);
  const { token, userId, role } = useSelector((state) => state.auth);
  const [DBUpdated, setDBUpdated] = useState();
  const handleChange = () => {
    setProblemPanelSize(0);
    setChecked((prev) => !prev);
  };

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  // // Usage example
  // const token = getCookie('token');
  // if (token) {
  //   console.log('Token is available:', token);
  // } else {
  //   console.log('Token is not available');
  // }

  useEffect(() => {
    axios
      .get("http://localhost:3050/home", { withCredentials: false })
      .then((response) => {
        setProblemList(response.data.responseData);
        setLoginStatus(response.data.loginStatus);
        console.log(response.data.loginStatus);
      })
      .catch((error) => console.error("Error fetching problems:", error));
  }, [DBUpdated]);

  useEffect(() => {
    if (getCookie("token")) {
      try {
        dispatch(
          loginThunk({
            email: "",
            password: "",
          })
        );
        setLoginStatus(true);
      } catch (err) {
        console.log("Error in dispatch for login from Home window", err);
      }
    }
  }, []);

  const handleCode = (value) => {
    setCode(value);
    console.log(code);
  };

  const handleOpenUserDialog = () => {
    if (getCookie("token")) {
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
    }
    setOpenUserDialog(true);
  };

  const handleCloseUserDialog = () => {
    setOpenUserDialog(false);
  };

  //const [testcases, setTestcases] = useState();

  const handleAddNewProblem = async () => {
    try {
      if (problemId) {
        setSelectedProblem((prevProblem) => ({
          ...prevProblem,
          problemName: "New Problem Name",
        }));
      } else {
        const newProblem = {
          problemName: "New Problem's name",
          problemStatement: "New problem's statement",
          Constraints: "New Problem's constraints",
          IOformatDescription:
            "New Problem's input and output format description",
          testcaseList: [
            {
              input: "1 2",
              output: "3",
              category: "sample",
            },
          ],
        };

        // Set the selected problem with the new problem details
        setSelectedProblem(newProblem);
      }
      // Open the problem window
      setIsProblemWindowOpened(true);

      // Set the problem ID to indicate a new problem is being added
      setProblemId("addNewProblem");
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleAddNewTestCase = () => {
    setSelectedProblem((prevProblem) => ({
      ...prevProblem,
      testcaseList: [
        ...prevProblem.testcaseList,
        {
          input: "1 2",
          output: "3",
          category: "sample",
        },
      ],
    }));
  };

  const handleRemoveTestCase = (index) => {
    console.log(index);
    setSelectedProblem((prevProblem) => ({
      ...prevProblem,
      testcaseList: [...prevProblem.testcaseList.splice(index, 1)],
    }));
  };

  const handleProblemClicked = async (problemId) => {
    setIsLoadingProblem(true);
    try {
      const response = await axios.get(`http://localhost:3050/${problemId}`);
      console.log(response.data);
      setSelectedProblem(response.data);
      setIsProblemWindowOpened(true);
      setProblemId(problemId);
    } catch (error) {
      console.error("Error fetching problem data:", error);
    } finally {
      setIsLoadingProblem(false);
    }
  };
  useEffect(() => {
    console.log(selectedProblem);
    console.log(problemId);
  }, [isProblemWindowOpened, problemId, selectedProblem]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleListItemEdits = (parameter, value, testcaseIndex = -1) => {
    //setInput(event.target.value);
    if (testcaseIndex == -1) {
      selectedProblem[parameter] = value;
    } else {
      selectedProblem.testcaseList[testcaseIndex][parameter] = value;
    }
    console.log(selectedProblem);
  };

  const handleRunCode = async () => {
    const payload = {
      language: language,
      code,
      input,
    };
    console.log(input);
    try {
      const { data } = await axios.post("http://localhost:3050/run", payload);
      console.log(data);
      setOutput(data.output);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleUpdateProblem = async () => {
    if (
      !selectedProblem.problemName ||
      !selectedProblem.problemStatement ||
      !selectedProblem.IOformatDescription ||
      !selectedProblem.testcaseList ||
      !selectedProblem.Constraints ||
      !problemId
    ) {
      setSnackbarMessage("All inputs must be filled!");
      setOpenSnackbar(true);
      return;
    }
    for (let i = 0; i < selectedProblem.testcaseList.length; i++) {
      const currentTestcase = selectedProblem.testcaseList[i];
      if (!currentTestcase.input || !currentTestcase.output) {
        setSnackbarMessage("All inputs must be filled!");
        setOpenSnackbar(true);
        return false;
      }
      if (
        !(
          currentTestcase.category === "sample" ||
          currentTestcase.category === "hidden"
        )
      ) {
        setSnackbarMessage("Testcase category must be 'sample' or 'hidden'!");
        setOpenSnackbar(true);
        return false;
      }
    }

    try {
      const response = await axios.put(
        "http://localhost:3050/updateProblem",
        {
          problemId,
          problemName: selectedProblem.problemName,
          problemStatement: selectedProblem.problemStatement,
          constraints: selectedProblem.Constraints,
          IOformatDescription: selectedProblem.IOformatDescription,
          testcaseList: selectedProblem.testcaseList,
        },
        { withCredentials: true }
      );
      console.log(response);
      setIsProblemWindowOpened(false);
      setDBUpdated(true);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handleUpload = async () => {
    if (problemId == "addNewProblem") handleUploadNewProblem();
    else handleUpdateProblem();
  };

  const handleUploadNewProblem = async () => {
    if (
      !selectedProblem.problemName ||
      !selectedProblem.problemStatement ||
      !selectedProblem.IOformatDescription ||
      !selectedProblem.testcaseList ||
      !selectedProblem.Constraints
    ) {
      setSnackbarMessage("All inputs must be filled!");
      setOpenSnackbar(true);
      return;
    }
    for (let i = 0; i < selectedProblem.testcaseList.length; i++) {
      const currentTestcase = selectedProblem.testcaseList[i];
      if (!currentTestcase.input || !currentTestcase.output) {
        setSnackbarMessage("All inputs must be filled!");
        setOpenSnackbar(true);
        return false;
      }
      if (
        !(
          currentTestcase.category === "sample" ||
          currentTestcase.category === "hidden"
        )
      ) {
        setSnackbarMessage("Testcase category must be 'sample' or 'hidden'!");
        setOpenSnackbar(true);
        return false;
      }
    }

    try {
      const response = await axios.post(
        "http://localhost:3050/addProblem",
        {
          problemName: selectedProblem.problemName,
          problemStatement: selectedProblem.problemStatement,
          constraints: selectedProblem.Constraints,
          IOformatDescription: selectedProblem.IOformatDescription,
          testcaseList: selectedProblem.testcaseList,
        },
        { withCredentials: true }
      );
      console.log(response);
      setDBUpdated(true);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handleRemoveProblem = async (problemId) => {
    try {
        const response = await axios.delete(
            "http://localhost:3050/deleteProblem",
            {
                data: { problemId }, // This is where you include the problemId in the request body
                withCredentials: true // Configuration options
            }
        );
        console.log(response);
        setDBUpdated(true);
    } catch (err) {
        console.log(err.response.data);
    }
};


  const updateOutputWithResponse = (response) => {
    const responseString = JSON.stringify(response, null, 2)
      .replace(/[\{\}]/g, "") // Remove curly braces
      .replace(/"/g, "") // Remove double quotes
      .replace(/,/g, "\n"); // Replace commas with new lines
    setOutput(responseString.trim());
  };

  const handleBackNavigation = () => {
    setIsProblemWindowOpened(false);
    // if (checked == false) {
    //   //setProblemPanelSize(4);
    // } else if (checked == true) {
    //   setProblemPanelSize(12);
    // }
  };

  const handleSubmit = async () => {
    //console.log(e.key);
    if (!problemId) {
      console.log("Problem not selected");
      return;
    }
    if (!token) {
      handleOpenUserDialog();
      return;
    }
    const payload = {
      language: language,
      code,
      problemId,
    };
    try {
      const { data } = await axios.post(
        "http://localhost:3050/submit",
        payload,
        { withCredentials: true }
      );
      console.log(data);
      updateOutputWithResponse(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState();

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  const handleProblemNameChanged = (event) => {
    setSelectedProblem((prevProblem) => ({
      ...prevProblem,
      problemName: event.target.value,
    }));
  };

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackBar}
        message={snackbarMessage}
      />
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
        <Grid
          container
          spacing={2}
          sx={{ height: "calc(100vh - 64px)", overflow: "hidden" }}
        >
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
                  {problemList &&
                    problemList.map((problem, index) => (
                      <ListItem
                        key={problem._id}
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
                        // Properly bind the function
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
                          onClick={() => handleProblemClicked(problem._id)}
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
                              {problem.problemName}
                            </Typography>
                            <ArrowForwardIosIcon sx={{ color: "#FFD700" }} />
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveProblem(problem._id);
                              }}
                              sx={{ color: "#FFD700", marginLeft: "8px" }}
                            >
                              <RemoveCircleIcon />
                            </IconButton>
                          </Box>
                        </Paper>
                      </ListItem>
                    ))}
                </List>
              )}
              {isProblemWindowOpened &&
                (isLoadingProblem ? (
                  <div>Loading...</div>
                ) : (
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
                        top: 0,
                        zIndex: 1,
                        backgroundColor: "#3d3d3d",
                        padding: "12px",
                        borderRadius: "4px",
                        marginBottom: "8px",
                      }}
                    >
                      <IconButton
                        color="inherit"
                        aria-label="back"
                        sx={{ marginRight: 1, color: "#FFD700" }}
                        onClick={handleBackNavigation}
                      >
                        <ArrowBackIosOutlinedIcon />
                      </IconButton>
                      {role == "admin" ? (
                        <TextField
                          value={selectedProblem && selectedProblem.problemName}
                          onChange={(e) => handleProblemNameChanged(e)}
                          fullWidth
                          multiline
                          variant="outlined"
                          sx={{
                            backgroundColor: "#f5f5f5",
                            borderRadius: "4px",
                          }}
                        />
                      ) : (
                        <Typography
                          variant="h5"
                          component="h1"
                          sx={{ fontWeight: "bold", color: "#FFD700" }}
                        >
                          {selectedProblem && selectedProblem.problemName}
                        </Typography>
                      )}
                    </Box>
                    {selectedProblem &&
                      Object.entries(selectedProblem)
                        .filter(
                          ([key]) =>
                            key !== "problemName" &&
                            key !== "category" &&
                            key !== "testcaseList"
                        )
                        .map(([key, value]) => (
                          <ProblemListItem
                            accordionSummary={key}
                            accordionDetails={value}
                            key={key}
                            handleListItemEdits={handleListItemEdits}
                          />
                        ))}
                    {selectedProblem &&
                      selectedProblem.testcaseList &&
                      selectedProblem.testcaseList.map((param, index) => (
                        <Accordion
                          key={index}
                          defaultExpanded
                          sx={{
                            backgroundColor: "#2e2e2e",
                            borderRadius: "8px",
                            marginBottom: "8px", // Added margin to always have space between accordions
                            "&:before": {
                              display: "none",
                            },
                            "&.Mui-expanded": {
                              marginBottom: "8px", // Margin when expanded
                            },
                          }}
                        >
                          <AccordionSummary
                            expandIcon={
                              <ExpandMoreIcon sx={{ color: "#FFD700" }} />
                            }
                            sx={{
                              backgroundColor: "#3d3d3d",
                              color: "#FFD700",
                              borderTopLeftRadius: "8px",
                              borderTopRightRadius: "8px",
                              "&.Mui-expanded": {
                                borderBottomLeftRadius: 0,
                                borderBottomRightRadius: 0,
                              },
                            }}
                          >
                            <Stack direction="row" alignItems="center">
                              {/* {role === "admin" && (
                                <RemoveCircleOutlineIcon
                                  onClick={() => handleRemoveTestCase(index)}
                                  sx={{ cursor: "pointer", color: "#FFD700" }}
                                />
                              )} */}
                              <Typography
                                variant="subtitle1"
                                fontWeight="Bold"
                                marginLeft={2}
                              >
                                Testcase {index + 1}
                              </Typography>
                            </Stack>
                          </AccordionSummary>
                          <AccordionDetails>
                            {Object.entries(param).map(
                              ([key, value]) =>
                                key != "__v" && (
                                  <ProblemListItem
                                    key={key} // Ensure that each item has a unique key
                                    accordionSummary={key}
                                    accordionDetails={value}
                                    handleListItemEdits={handleListItemEdits}
                                    index={index}
                                  />
                                )
                            )}
                          </AccordionDetails>
                        </Accordion>
                      ))}
                    {role === "admin" && (
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#FFD700",
                          color: "#181818",
                          "&:hover": { backgroundColor: "#FFC700" },
                          margin: 2,
                        }}
                        onClick={() => {
                          handleAddNewTestCase();
                        }}
                      >
                        Add New Testcase
                      </Button>
                    )}
                    {role === "admin" && (
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#FFD700",
                          color: "#181818",
                          "&:hover": { backgroundColor: "#FFC700" },
                          margin: 2,
                        }}
                        onClick={() => {
                          handleUpload();
                        }}
                      >
                        Upload
                      </Button>
                    )}
                  </Grid>
                ))}
            </Grid>
          )}
          <Grid
            item
            xs={checked ? 12 : 8}
            sx={{
              height: "100vh",
              backgroundColor: "#2c2c2c",
              boxShadow: 2,
              overflowY: "auto",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                paddingTop: 2,
                paddingLeft: 2,
                paddingRight: 2,
                width: "100%",
                height: "10vh",
                backgroundColor: "#1a1a1a",
                gap: 2,
              }}
            >
              <FormControl fullWidth>
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
                  onChange={(event) => setLanguage(event.target.value)}
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
                  <MenuItem value={"javascript"} disabled>
                    JavaScript
                  </MenuItem>
                  <MenuItem value={"java"} disabled>
                    Java
                  </MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#FFD700",
                  color: "#181818",
                  "&:hover": { backgroundColor: "#FFC700" },
                }}
                onClick={() => {
                  handleRunCode();
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
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Submit
                </Button>
              )}
            </Box>
            <Box
              sx={{
                height: "auto",
                minHeight: "50vh",
                overflow: "auto",
                backgroundColor: "#1a1a1a",
                padding: 2,
              }}
            >
              <CodeEditor language={language} handleCode={handleCode} />
            </Box>
            <Box
              sx={{
                height: "auto",
                backgroundColor: "#1a1a1a",
                padding: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <TextField
                placeholder={input}
                multiline
                variant="outlined"
                onChange={handleInputChange}
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
                height: "auto",
                minHeight: "40vh",
                backgroundColor: "#1a1a1a",
                padding: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <TextField
                placeholder="Output will appear here"
                value={output}
                multiline
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
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
        <User onClose={handleCloseUserDialog} loginStatus={loginStatus} />
      </Dialog>
      <Outlet />
    </>
  );
}
