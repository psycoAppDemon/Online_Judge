import React from "react";
import { Box, TextField } from "@mui/material";

export const outputBox = () => {
    return (
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
          placeholder="Output comes here..."
          multiline
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
    );
  };
  