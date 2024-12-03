import React from "react";
import { Box, TextField } from "@mui/material";

const InputBox = ({ placeholder, setInput }) => {

  const handleInputOnChange = (event) =>{
    setInput(event.target.value);
  }

  return (
    <TextField
      multiline
      fullWidth
      onChange={handleInputOnChange}
      placeholder={placeholder}
      variant="outlined"
      InputProps={{
        sx: {
          alignItems: "start", // Align text to top
          height: "100%",
          overflow: "auto",
          "& textarea": {
            height: "100%",
            resize: "none", // Ensure padding for better appearance
            padding: "0px",
          },
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          height: "100%", // Match parent's height
          overflow: "hidden", // Prevent layout issues
          margin: 0,
        },
        margin: 0,
        padding: 0,
      }}
    />
  );
};

export default InputBox;
