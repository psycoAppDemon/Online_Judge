import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import { resetAuthResponseStatus,resetIsAuthButtonClicked } from "../../store/slices/authSlice";

const AuthResult = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/" || location.pathname === "/home";

  const {
    responseStatus,
    outcomeMessage,
    isAlreadyLoggedIn,
    isAutoLoginTried,
    isAuthButtonClicked
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(resetAuthResponseStatus());
    dispatch(resetIsAuthButtonClicked());
  };

  // Auto-close dialog after 3 seconds
  // useEffect(() => {
  //   if (!isHomePage && !isAutoLoginTried && !isAlreadyLoggedIn) {
  //     const timer = setTimeout(() => {
  //       handleClose();
  //     }, 2000);

  //     return () => clearTimeout(timer); // Cleanup function
  //   }
  // }, [responseStatus, isAlreadyLoggedIn, isHomePage, dispatch]);

  return (
    isAuthButtonClicked && (
    <Dialog open={responseStatus && !isAlreadyLoggedIn} onClose={handleClose}>
      <DialogContent>{outcomeMessage}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>)
  );
};

export default AuthResult;
