import React from "react";
import { Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectLanguage = () => {
  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
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
          <MenuItem value="js">JS</MenuItem>
          <MenuItem value="java">Java</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectLanguage;
