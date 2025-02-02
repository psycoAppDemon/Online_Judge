// src/features/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, signupThunk, signoutThunk } from "../thunks/authThunks";
import { submissionHistoryThunk } from "../thunks/submissionHistoryThunk";

const initialState = {
  loading: false,
  submissionHistoryLoading: false,
  isAlreadyLoggedIn: true,
  isAuthenticated: false, // New state to track if the user is logged in
  error: false,
  outcomeMessage: "",
  responseStatus: null,
  user: null, // Object for user details (ID, email, role, etc.)
  submissionHistory: null,
  isAutoLoginTried: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthResponseStatus: (state) => {
      state.responseStatus = null;
    },
    resetIsAlreadyLoggedIn: (state) => {
      state.isAlreadyLoggedIn = false;
    },
    resetIsAutoLoginTried: (state) =>{
      state.isAutoLoginTried = true;
    },
    resetSubmissionHistory: (state) =>{
      state.submissionHistory = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login Thunk
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.error = false;
        state.responseStatus = 200;
        state.outcomeMessage = "Success";
        state.user = action.payload.user;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.responseStatus = 400;
        state.outcomeMessage = action.payload?.error?.verdict || "Login failed";
      })

      // Signup Thunk
      .addCase(signupThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.error = false;
        state.outcomeMessage = "Success";
        state.responseStatus = 200;
        state.user = action.payload.user;
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.responseStatus = 400;
        state.outcomeMessage =
          action.payload?.error?.verdict || "Signup failed";
      })

      // Signout Thunk
      .addCase(signoutThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(signoutThunk.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = false;
        state.responseStatus = 200;
        state.outcomeMessage = "Logged Out Successfully";
        state.user = null; // Clear user data on logout
      })
      .addCase(signoutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.responseStatus = 400;
        state.outcomeMessage =
          action.payload?.error?.verdict || "Logout failed";
      })
      .addCase(submissionHistoryThunk.pending, (state) => {
        state.submissionHistoryLoading = true;
      })
      .addCase(submissionHistoryThunk.fulfilled, (state, action) => {
        state.submissionHistoryLoading = false;
        state.submissionHistory = action.payload.submission.reduce(
          (acc, curr) => {
            if (acc[curr.problemId]) {
              // If the existing verdict is "Wrong Answer" and the current one is "Accepted", update it
              if (
                acc[curr.problemId] === "Wrong Answer" &&
                curr.verdict === "Accepted"
              ) {
                acc[curr.problemId] = "Accepted";
              }
            } else {
              // If the problemId doesn't exist, set it normally
              acc[curr.problemId] = curr.verdict;
            }
            return acc
          },
          {}
        );
        console.log(state.submissionHistory);
      })
      .addCase(submissionHistoryThunk.rejected, (state, action) => {
        state.submissionHistoryLoading = false;
      });
  },
});

export default authSlice.reducer;
export const { resetAuthResponseStatus, resetIsAlreadyLoggedIn, resetIsAutoLoginTried, resetSubmissionHistory } =
  authSlice.actions;
