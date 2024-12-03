import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { resetAuthResponseStatus } from "../../store/slices/authSlice";
const AuthResult = () => {
  const { isAuthenticated, responseStatus, error, outcomeMessage, isAlreadyLoggedIn } =
    useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(resetAuthResponseStatus());
  };
  return (
    
    <Dialog open={responseStatus && !isAlreadyLoggedIn?true:false} onClose={handleClose}>
      <DialogContent>
        {outcomeMessage}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AuthResult;
