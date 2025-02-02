import React from "react";
import { Box, Typography, IconButton, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { resetRunCodeStates } from "../store/slices/runCodeSlice";
import { resetSubmitCodeStates } from "../store/slices/submitCodeSlice";

const SubmissionResult = ({ setshowOutput }) => {
  const { runCodeLoading, runCodeOutput, runCodeResponse } = useSelector(
    (state) => state.runCode
  );
  const { submitCodeLoading, submitCodeOutput, submitCodeResponse } =
    useSelector((state) => state.submitCode);
  const dispatch = useDispatch();
  const handleCloseOutputButtonClicked = () => {
    dispatch(resetSubmitCodeStates());
    dispatch(resetRunCodeStates());
    setshowOutput(false);
  };
  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: 2,
        padding: 2,
        position: "relative",
      }}
    >
      {(!runCodeLoading || !submitCodeLoading) && (
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
          onClick={handleCloseOutputButtonClicked}
        >
          <CloseIcon />
        </IconButton>
      )}
      <Typography
        variant="h4"
        sx={{
          textAlign: "left",
          mb: 1,
          color: runCodeLoading || submitCodeLoading
            ? "#FFBF00"
            : runCodeResponse === "Success" || submitCodeResponse === "Accepted"
            ? "#2E8B57"
            : "#D22B2B",
          fontWeight: "bold",
        }}
      >
        {runCodeLoading ? "Running..." : runCodeResponse}
        {submitCodeLoading ? "Submitting Solution..." : submitCodeResponse}
      </Typography>
      {!runCodeLoading && (
        <Typography variant="body1" sx={{ textAlign: "left", whiteSpace: "pre-wrap",
          wordBreak: "break-word", maxHeight:"10vh", overflowY:"auto"}}>
          {"iuuuuuuoppppqwoiueqwieoqiwoueoquiwoeiqowieuouiwqoeiqwuoeuiwoqiweoqewrpoeiproweiporpwieopioooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooouwoeqoweeruiowieuriowieroweuiroweuroiweuoriueriwueoqwoeiwqe"}
        </Typography>
      )}
      {!submitCodeLoading && (
        <Typography variant="body1" sx={{ textAlign: "left" }}>
          {submitCodeOutput}
        </Typography>
      )}
    </Box>
  );
};

export default SubmissionResult;
