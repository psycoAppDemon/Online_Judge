import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import "../style/body.css";
import ProblemListItem from "./ProblemListItem";
import CodeEditor from "./CodeEditor";
import SelectLanguage from "./SelectLanguage";
import InputBox from "./InputBox";

const Body = () => {
  const MenuList = new Array(10).fill({ name: "Problem" });

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap", // Allow wrapping
        justifyContent: "center",
        gap: 2, // Space between items
        padding: 2,
        mx: 4,
      }}
    >
      <Box
        sx={{
          flex: "1 1 250px",
          height: "60vh",
          overflow: "auto",
          marginTop: "16px",
        }}
      >
        {MenuList.map((menu, index) => (
          <ProblemListItem></ProblemListItem>
        ))}
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        sx={{
          flex: "1 1 300px", // Flexible basis with minimum 300px
          height: "60vh",
          overflow: "hidden",
          marginTop: "16px",
          marginRight: 3,
        }}
      >
        <CodeEditor></CodeEditor>
        <Box display="flex" sx={{ marginTop: 2 , height: "20vh"}}>
          <Box display="flex" flexDirection="column" sx={{ marginRight: 1 }}>
            <SelectLanguage></SelectLanguage>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              sx={{ marginTop: 1 }}
            >
              Run
            </Button>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              sx={{ marginTop: 1 }}
            >
              Submit
            </Button>
          </Box>
          <Box sx={{ display: "flex", flex: 1, gap: 1, paddingRight: 1}}>
            <InputBox placeholder="Enter your input here..."/>
            <InputBox placeholder="Enter your output here..."/>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Body;
