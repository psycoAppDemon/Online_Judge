import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import WebsiteLogo from "./WebsiteLogo";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ToggleColorMode from "./ToggleColorMode";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: "8px 12px",
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const mode = useSelector((state) => state.color_mode.mode); 
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleHomeButtonClicked = () => {
    navigate("/");
  };

  const handleLogInButtonClicked = () => {
    navigate("/login");
  };

  const handleProfileButtonClicked = () => {
    navigate("/profile");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: 2,
      }}
    >
      <Box sx={{ mx: {xs:"2px", sm:8} }}>
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <WebsiteLogo></WebsiteLogo>

            <Typography
              color={mode=="dark"?"white":"black"}
              variant="h3"
              sx={{
                marginLeft: { xs: 1, sm: 2, md: 3 }, // Adjusts margin based on screen size
                fontSize: {
                  xs: "1.5rem",
                  sm: "2rem",
                  md: "2.5rem",
                  lg: "3rem",
                }, // Responsive font sizes
                fontWeight: 600, // Makes it visually strong
              }}
            >
              CodeDebutants
            </Typography>
          </Box>
          <Box sx={{ marginRight: 2 }}>
            <ToggleColorMode data-screenshot="toggle-mode" />
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            <Button
              color="primary"
              variant={
                location.pathname === "/home" || location.pathname === "/"
                  ? "contained"
                  : "text"
              }
              size="small"
              onClick={handleHomeButtonClicked}
            >
              Home
            </Button>
            {isAuthenticated && (
              <Button
                color="primary"
                variant={
                  location.pathname === "/profile" ? "contained" : "text"
                }
                size="small"
                onClick={handleProfileButtonClicked}
              >
                Profile
              </Button>
            )}
            {!isAuthenticated && (
              <Button
                color="primary"
                variant={location.pathname === "/login" ? "contained" : "text"}
                size="small"
                onClick={handleLogInButtonClicked}
              >
                Log In
              </Button>
            )}
          </Box>
          <Box sx={{ display: { sm: "flex", md: "none" } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                {/* <Divider sx={{ my: 3 }} />
                <MenuItem>Features</MenuItem>
                <MenuItem>Testimonials</MenuItem>
                <MenuItem>Highlights</MenuItem>
                <MenuItem>Pricing</MenuItem>
                <MenuItem>FAQ</MenuItem>
                <MenuItem>Blog</MenuItem> */}

                <MenuItem
                  sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  <Button
                    color="primary"
                    variant="outlined"
                    fullWidth
                    onClick={handleHomeButtonClicked}
                  >
                    Home
                  </Button>
                  {!isAuthenticated ? (
                    <Button
                      color="primary"
                      variant="outlined"
                      fullWidth
                      onClick={handleLogInButtonClicked}
                    >
                      Log In
                    </Button>
                  ) : (
                    <Button
                      color="primary"
                      variant="outlined"
                      fullWidth
                      onClick={handleProfileButtonClicked}
                    >
                      Profile
                    </Button>
                  )}
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Box>
    </AppBar>
  );
}
