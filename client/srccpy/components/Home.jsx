import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ButtonBase,
} from "@mui/material";
import "../style/body.css";
import ProblemListItem from "./ProblemListItem";
import CodeEditor from "./CodeEditor";
import SelectLanguage from "./SelectLanguage";
import InputBox from "./InputBox";
import AuthResult from "./authentication/AuthResult";
import { useSelector, useDispatch } from "react-redux";
import { problemListThunk } from "../store/thunks/problemThunk";
import { currentProblemThunk } from "../store/thunks/currentProblemThunk.js";
import { setCurrentProblemId } from "../store/slices/currentProblemSlice.js";
import { loginThunk } from "../store/thunks/authThunks.js";
import CurrentProblemWindow from "./CurrentProblemWindow.jsx";
import { submissionHistoryThunk } from "../store/thunks/submissionHistoryThunk.js";
import { runCodeThunk } from "../store/thunks/runCodeThunk.js";
import SubmissionResult from "./SubmissionResult.jsx";
import { useNavigate } from "react-router-dom";
import { submitCodeThunk } from "../store/thunks/submitCodeThunk.js";
import { resetRunCodeStates } from "../store/slices/runCodeSlice";
import { resetSubmitCodeStates } from "../store/slices/submitCodeSlice";
import { resetIsAutoLoginTried } from "../store/slices/authSlice.js";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isProblemListWindow, setIsProblemListWindow] = useState(true);
  const [code, setCode] = useState();
  const [language, setLanguage] = useState("cpp");
  const [input, setInput] = useState();
  const [showOutput, setshowOutput] = useState(false);
  const { runCodeLoading } = useSelector((state) => state.runCode);
  // Access loading and problemList states from Redux
  const { problemLoading, problemList } = useSelector((state) => state.problem);
  const { currentProblemId } = useSelector((state) => state.currentProblem);
  const { isAuthenticated, submissionHistory, isAutoLoginTried } = useSelector(
    (state) => state.auth
  );
  const { submitCodeLoading } = useSelector((state) => state.submitCode);
  console.log(problemList);

  // Fetch problem list when component mounts
  useEffect(() => {
    console.log(`1. Auth: ${isAuthenticated}`);
    if (!isAutoLoginTried) {
      dispatch(loginThunk({ email: "", password: "" }))
        .catch((error) => {
          console.error("Error dispatching thunks:", error);
        });
      dispatch(resetIsAutoLoginTried()); 
    }
    if (!problemList) dispatch(problemListThunk());
  }, [dispatch]);

  useEffect(()=>{
    dispatch(submissionHistoryThunk());
  },[isAuthenticated]);

  const handleOpenProblem = (problemId) => {
    setIsProblemListWindow(false);
    dispatch(setCurrentProblemId({ problemId }));
    dispatch(currentProblemThunk({ problemId }));
  };

  const handleRunButtonClicked = async () => {
    dispatch(resetSubmitCodeStates());
    dispatch(resetRunCodeStates());
    dispatch(runCodeThunk({ code, language, input }));
    setshowOutput(true);
    //console.log(`${code} ${input} ${language}`);
  };

  const handleSubmitButtonClicked = async () => {
    if (!isAuthenticated) navigate("/login");
    dispatch(resetSubmitCodeStates());
    dispatch(resetRunCodeStates());
    dispatch(submitCodeThunk({ code, language, currentProblemId }));
    setshowOutput(true);
  };

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexWrap: "wrap", // Allow wrapping
          justifyContent: "center",
          gap: 1, // Space between items
          marginTop: 12,
          marginBottom: 1,
        }}
      >
        {problemLoading ? (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxHeight: "80vh",
              width: "50%",
              overflow: "auto",
              padding: 0,
            }}
          >
            <CircularProgress
              size={80}
              sx={{ width: "100%", alignSelf: "center" }}
            />
          </Box>
        ) : (
          <>
            {isProblemListWindow ? (
              <Box
                sx={{
                  flex: 1,
                  maxHeight: "80vh",
                  minWidth: "240px",
                  overflow: "auto",
                  paddingTop: 1,
                }}
              >
                {problemList?.map((problem, index) => (
                  <Box key={problem._id} sx={{ marginBottom: 1 }}>
                    <ButtonBase
                      onClick={() => handleOpenProblem(problem._id)}
                      sx={{ width: "100%" }}
                    >
                      <ProblemListItem
                        problemName={problem.problemName}
                        serialNo={index + 1} // Serial number starting from 1
                        submissionstatus={
                          submissionHistory
                            ? submissionHistory[problem._id]
                            : "Not Attempted"
                        }
                      />
                    </ButtonBase>
                  </Box>
                ))}
              </Box>
            ) : (
              <Box
                sx={{
                  flex: 1,
                  maxHeight: "80vh",
                  minWidth: "240px",
                  overflow: "auto",
                  padding: 0,
                }}
              >
                <CurrentProblemWindow
                  setIsProblemListWindow={setIsProblemListWindow}
                />
              </Box>
            )}
          </>
        )}

        <Box
          display="flex"
          flexDirection="column"
          sx={{
            flex: "1", // Flexible basis with minimum 300px
            maxheight: "80vh",
            minWidth: "240px",
            height: "80vh",
            overflow: "hidden",
          }}
        >
          <CodeEditor setCode={setCode} />
          <Box display="flex" sx={{ marginTop: 2, gap: 1 }}>
            <Box display="flex" flexDirection="column" gap={1}>
              <SelectLanguage setLanguage={setLanguage} />
              <Button
                color={runCodeLoading ? "grey" : "primary"}
                variant="contained"
                fullWidth
                disabled={runCodeLoading}
                onClick={handleRunButtonClicked}
              >
                Run
              </Button>
              {!isProblemListWindow && (
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  disabled={submitCodeLoading}
                  onClick={handleSubmitButtonClicked}
                >
                  Submit
                </Button>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                flex: 1,
                gap: 1,
                maxHeight: isProblemListWindow ? "14vh" : "21vh",
              }}
            >
              <InputBox
                placeholder="Enter your input here..."
                setInput={setInput}
              />
            </Box>
          </Box>
          {showOutput && (
            <Box sx={{ marginTop: 2 }}>
              <SubmissionResult
                setshowOutput={setshowOutput}
              ></SubmissionResult>
            </Box>
          )}
        </Box>
      </Box>
      <AuthResult />
    </Layout>
  );
};

export default Home;
