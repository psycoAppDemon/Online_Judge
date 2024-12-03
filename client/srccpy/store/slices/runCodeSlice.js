// src/features/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { runCodeThunk } from "../thunks/runCodeThunk.js";

const initialState = {
  runCodeLoading: false,
  runCodeOutput: null,
  runCodeResponse: null,
};

const runCodeSlice = createSlice({
  name: "runCode",
  initialState,
  reducers: {
    resetRunCodeStates: (state) => {
      state.runCodeResponse = false;
      state.runCodeLoading= null;
      state.runCodeOutput=null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login Thunk
      .addCase(runCodeThunk.pending, (state) => {
        state.runCodeLoading = true;
      })
      .addCase(runCodeThunk.fulfilled, (state, action) => {
        state.runCodeLoading = false;
        console.log(JSON.stringify(action));
        state.runCodeOutput = action.payload.output;
        state.runCodeResponse = action.payload.message;
      })
      .addCase(runCodeThunk.rejected, (state, action) => {
        state.runCodeLoading = false;
        console.log(JSON.stringify(action));
        console.log("Errorrrrrrrr");
        state.runCodeOutput = action.payload.error.error;
        state.runCodeResponse = action.payload.error.message;
      });
  },
});

export default runCodeSlice.reducer;
export const { resetRunCodeStates } = runCodeSlice.actions;
