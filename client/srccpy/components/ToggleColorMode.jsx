import * as React from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import ModeNightRoundedIcon from "@mui/icons-material/ModeNightRounded";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import { useSelector, useDispatch } from "react-redux";
import { toggleColorMode } from "../store/slices/colorModeSlice";

function ToggleColorMode({ ...props }) {
  // Access the current mode from Redux store
  const mode = useSelector((state) => state.color_mode.mode); 
  const dispatch = useDispatch();

  const handleToggle = () => {
    // Dispatch the action to toggle mode
    dispatch(toggleColorMode());
    
    // Update the localStorage with the new mode after dispatch
    const newMode = mode === "dark" ? "light" : "dark"; // Toggled mode
    localStorage.setItem("themeMode", newMode); // Save the new mode to localStorage
  };

  return (
    <IconButton
      onClick={handleToggle}
      color="primary"
      size="small"
      aria-label="Theme toggle button"
      {...props}
    >
      {mode === "dark" ? (
        <WbSunnyRoundedIcon fontSize="small" />
      ) : (
        <ModeNightRoundedIcon fontSize="small" />
      )}
    </IconButton>
  );
}

// No need for PropTypes since `mode` and `toggleColorMode` are now managed via Redux
// Remove PropTypes validation
export default ToggleColorMode;
