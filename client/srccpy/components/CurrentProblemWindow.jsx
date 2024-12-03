import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import AcceptedIcon from "../utils/Tick_circle.svg";
import WrongAnswerIcon from "../utils/Cross_circle.svg";
const CurrentProblemWindow = ({ setIsProblemListWindow }) => {
  const {
    currentProblemData,
    currentProblemError,
    currentProblemId,
    currentProblemLoading,
    currentProblemOutcomeMessage,
  } = useSelector((state) => state.currentProblem);
  const { submissionHistory } = useSelector((state) => state.auth);
  const handleBack = () => {
    setIsProblemListWindow(true);
  };
  return (
    <>
      <Box
        elevation={3}
        sx={{
          padding: 2,
          maxWidth: 600,
          margin: "auto",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2, // Adds space between the arrow and the heading
            marginBottom: 1,
          }}
        >
          <IconButton
            onClick={handleBack}
            sx={{
              alignSelf: "center",
              justifyContent: "center",
            }}
          >
            <ArrowBack />
          </IconButton>

          <Typography
            variant="h4"
            sx={{ alignSelf: "center", textAlign: "center", flex: 1 }}
          >
            {currentProblemLoading ? "Loading" : currentProblemData.problemName}
          </Typography>
          {submissionHistory &&
            submissionHistory[currentProblemId] == "Accepted" && (
              <Box
                alignSelf="center"
                component="img"
                src={AcceptedIcon}
                alt="Accepted"
                sx={{ width: 24, height: 24 }} // Adjust dimensions as needed
              />
            )}
          {submissionHistory &&
            submissionHistory[currentProblemId] == "Wrong Answer" && (
              <Box
                alignSelf="flex-end"
                component="img"
                src={WrongAnswerIcon}
                alt="Accepted"
                sx={{ width: 24, height: 24 }} // Adjust dimensions as needed
              />
            )}
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ textAlign: "justify" }}>
            {currentProblemLoading
              ? "Loading"
              : currentProblemData.problemStatement}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">I/O Format:</Typography>
          <Typography variant="body1" sx={{ textAlign: "justify" }}>
            {currentProblemLoading
              ? "Loading"
              : currentProblemData.IOformatDescription}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Constraints:</Typography>
          <Typography variant="body1" sx={{ textAlign: "justify" }}>
            {currentProblemLoading ? "Loading" : currentProblemData.Constraints}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Sample Testcases:</Typography>
          <List>
            {currentProblemLoading
              ? "Loading"
              : currentProblemData.testcaseList.map((testcase, index) => (
                  <ListItem
                    key={index}
                    sx={{ flexDirection: "column", alignItems: "flex-start" }}
                  >
                    <Typography variant="subtitle1">
                      <strong>Input:</strong> {testcase.input}
                    </Typography>
                    <Typography variant="subtitle1">
                      <strong>Output:</strong> {testcase.output}
                    </Typography>
                  </ListItem>
                ))}
          </List>
        </Box>
      </Box>
    </>
  );
};

export default CurrentProblemWindow;
