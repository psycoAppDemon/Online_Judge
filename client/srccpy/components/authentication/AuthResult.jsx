import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import { resetAuthResponseStatus } from "../../store/slices/authSlice";

const AuthResult = () => {
  const location = useLocation(); // ✅ Move inside the component
  const isHomePage = location.pathname === "/" || location.pathname === "/home";

  const { responseStatus, outcomeMessage, isAlreadyLoggedIn, isAutoLoginTried } =
    useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(resetAuthResponseStatus());
  };

  // Auto-close dialog after 3 seconds
  useEffect(() => {
    if (!isHomePage && !isAutoLoginTried && !isAlreadyLoggedIn) {
      const timer = setTimeout(() => {
        handleClose();
      }, 3000);

      return () => clearTimeout(timer); // Cleanup function
    }
  }, [responseStatus, isAlreadyLoggedIn, isHomePage, dispatch]);

  return (
    (
      <Dialog open={responseStatus && !isAlreadyLoggedIn} onClose={handleClose}>
        <DialogContent>{outcomeMessage}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
  );
};

export default AuthResult;
