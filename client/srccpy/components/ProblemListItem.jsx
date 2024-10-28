import { Card, Paper, Box } from "@mui/material";
import React from "react";
import AcceptedIcon from "../utils/Tick_circle.svg";
import NotAcceptedIcon from "../utils/Cross_circle.svg";
import NotAttempted from "../utils/Right_arrow.svg";
import { grey } from "@mui/material/colors";

const ProblemListItem = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        border: 1,
        borderColor: grey[50],
        marginBottom: 2,
        mx: 2,
        borderRadius: 1,
        minHeight: "40px",
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
      <Box sx={{ padding: 2, marginLeft: 1 }}>1.</Box>
      <Box
        sx={{
          flexGrow: 1,
          overflow: "hidden",
          whiteSpace: "nowrap", // Prevents text from wrapping
          textOverflow: "ellipsis", // Adds "..." at overflow
          marginLeft: 1,
        }}
      >
        This is a very long problem name that should be truncated...
      </Box>
      <Box
        component="img"
        src={AcceptedIcon}
        alt="Accepted"
        sx={{ width: 24, height: 24, marginLeft: 1, marginRight: 2 }} // Adjust dimensions as needed
      />
    </Box>
  );
};

export default ProblemListItem;
