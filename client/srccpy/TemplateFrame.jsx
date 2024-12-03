import * as React from "react";
import PropTypes from "prop-types";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import ToggleColorMode from "./components/ToggleColorMode";
import getBlogTheme from "./theme/getBlogTheme";
import { useSelector } from "react-redux";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderBottom: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.paper,
  boxShadow: "none",
  backgroundImage: "none",
  zIndex: theme.zIndex.drawer + 1,
  flex: "0 0 auto",
}));

function TemplateFrame({ children }) {
  // const handleChange = (event) => {
  //   toggleCustomTheme(event.target.value === "custom");
  // };
  const { mode } = useSelector((state) => state.color_mode);
  const blogTheme = createTheme(getBlogTheme(mode));

  return (
    <ThemeProvider theme={blogTheme}>
      <Box>{children}</Box>
    </ThemeProvider>
  );
}

TemplateFrame.propTypes = {
  children: PropTypes.node,
};

export default TemplateFrame;
