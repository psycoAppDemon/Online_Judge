import React from "react";
import Header from "./header";
import AppAppBar from "./AppAppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import MainContent from "./MainContent";
// import Footer from './components/Footer';
import TemplateFrame from "../TemplateFrame";
import getBlogTheme from "../theme/getBlogTheme";
import Body from "./Body";
import { Box } from "@mui/material";
const Layout = () => {
  //   return (
  //     <>
  //         <AppAppBar/>
  //     </>
  //   )
  const [mode, setMode] = React.useState("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const blogTheme = createTheme(getBlogTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  // This code only runs on the client side, to determine the system color preference
  React.useEffect(() => {
    // Check if there is a preferred mode in localStorage
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) {
      setMode(savedMode);
    } else {
      // If no preference is found, it uses system preference
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setMode(systemPrefersDark ? "dark" : "light");
    }
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode); // Save the selected mode to localStorage
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };
  return (
    <Box >
      <TemplateFrame
        toggleCustomTheme={toggleCustomTheme}
        showCustomTheme={showCustomTheme}
        mode={mode}
        toggleColorMode={toggleColorMode}
      >
        <ThemeProvider theme={showCustomTheme ? blogTheme : defaultTheme}>
          <CssBaseline enableColorScheme />
          <AppAppBar />
            <Body />
        </ThemeProvider>
      </TemplateFrame>
    </Box>
  );
};

export default Layout;
