import React from "react";
import { Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectLanguage = ({setLanguage}) => {
  const [selectedLanguage, setSelectedLanguage] = React.useState("cpp");
  const handleChange = (event) => {
    setSelectedLanguage(event.target.value);
    setLanguage(event.target.value);
  };
  return (
    <Box sx={{ minWidth: 120 , flex:1}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Language</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedLanguage}
          label="Select Language"
          onChange={handleChange}
          color="primary"
          sx={{
            "&:focus": {
              borderColor: "red", // Styling when focused
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "red", // Border color on focus
            },
          }}
        >
          <MenuItem value="cpp">C++</MenuItem>
          <MenuItem value="js" disabled={true}>JS</MenuItem>
          <MenuItem value="java" disabled={true}>Java</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectLanguage;
