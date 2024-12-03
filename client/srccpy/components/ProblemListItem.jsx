import { Card, Paper, Box, ButtonBase } from "@mui/material";
import React from "react";
import AcceptedIcon from "../utils/Tick_circle.svg";
import WrongAnswerIcon from "../utils/Cross_circle.svg";
import { grey } from "@mui/material/colors";
import { useSelector } from "react-redux";
const ProblemListItem = ({ problemName, serialNo, submissionstatus }) => {
  console.log(`${problemName} ${serialNo}`);
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <Box
      alignItems="center"
      sx={{
        display: "flex",
        flex: 1,
        border: 1,
        borderColor: grey[50],
        marginBottom: 2,
        mx: 2,
        borderRadius: 1,
        minHeight: "56px",
        //borderRadius: "24px / 50%", // Semi-circular effect on left and right ends
        boxShadow: 2,
        overflow: "auto",
        transition: "transform 0.2s, box-shadow 0.2s", // Smooth animation
        "&:hover": {
          transform: "scale(1.03)", // Slight zoom on hover
          boxShadow: 4, // More shadow on hover
        },
      }}
    >
      <Box sx={{ padding: 2, marginLeft: 1 }}>{serialNo}.</Box>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexGrow: 1,
          overflow: "hidden",
          whiteSpace: "nowrap", // Prevents text from wrapping
          textOverflow: "ellipsis", // Adds "..." at overflow
          marginLeft: 1,
        }}
      >
        {problemName}
      </Box>
      {submissionstatus=="Accepted" && (
        <Box
          component="img"
          src={AcceptedIcon}
          alt="Accepted"
          sx={{ width: 24, height: 24, marginLeft: 1, marginRight: 2 }} // Adjust dimensions as needed
        />
      )}
      {submissionstatus=="Wrong Answer" && (
        <Box
          component="img"
          src={WrongAnswerIcon}
          alt="Accepted"
          sx={{ width: 24, height: 24, marginLeft: 1, marginRight: 2 }} // Adjust dimensions as needed
        />
      )}
    </Box>
  );
};

export default ProblemListItem;
