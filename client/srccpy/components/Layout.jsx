import React from "react";
import AppAppBar from "./AppAppBar.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector, useDispatch } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Footer from './components/Footer';
import TemplateFrame from "../TemplateFrame.jsx";
import getBlogTheme from "../theme/getBlogTheme.jsx";
import { Box } from "@mui/material";
const Layout = ({ children }) => {
  //   return (
  //     <>
  //         <AppAppBar/>
  //     </>
  //   )
  // const [mode, setMode] = React.useState("light");
  const { mode } = useSelector((state) => state.color_mode);
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const blogTheme = createTheme(getBlogTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  // This code only runs on the client side, to determine the system color preference
  // React.useEffect(() => {
  //   // Check if there is a preferred mode in localStorage
  //   const savedMode = localStorage.getItem("themeMode");
  //   if (savedMode) {
  //     setMode(savedMode);
  //   } else {
  //     // If no preference is found, it uses system preference
  //     const systemPrefersDark = window.matchMedia(
  //       "(prefers-color-scheme: dark)"
  //     ).matches;
  //     setMode(systemPrefersDark ? "dark" : "light");
  //   }
  // }, []);

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };
  return (
    <Box>
      <TemplateFrame>
        <ThemeProvider theme={showCustomTheme ? blogTheme : defaultTheme}>
          <CssBaseline enableColorScheme />
          <AppAppBar />
          <Box sx={{display: "flex", justifyContent:"center", alignContent: "center", alignSelf:"center", flex:"1", marginLeft: 6, marginRight:8, marginTop:2}}>{children}</Box>
        </ThemeProvider>
      </TemplateFrame>
    </Box>
  );
};

export default Layout;
