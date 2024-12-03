// src/features/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { problemListThunk } from "../thunks/problemThunk";

const initialState = {
  problemLoading: true,
  problemList: null,
  problemListError: false,
  problemListOutcomeMessage: "",
  problemListResponseStatus: null,
};

const problemSlice = createSlice({
  name: "problem",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login Thunk
      .addCase(problemListThunk.pending, (state)=>{
        console.log(state);
      })
      .addCase(problemListThunk.fulfilled, (state, action) => {
        state.problemLoading = false;
        console.log(JSON.stringify(action));
        state.problemList = action.payload.responseData;
      })
      .addCase(problemListThunk.rejected, (state, action) => {
        state.problemLoading = false;
        state.problemListResponseStatus = 400;
        console.log(JSON.stringify(action));
        state.problemListOutcomeMessage = action.payload?.error || "Loading Failed";
      });
  },
});

export default problemSlice.reducer;
