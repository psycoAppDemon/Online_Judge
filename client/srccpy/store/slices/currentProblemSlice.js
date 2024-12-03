// src/features/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { currentProblemThunk } from "../thunks/currentProblemThunk.js";

const initialState = {
  currentProblemLoading: true,
  currentProblemId: null,
  currentProblemData: null,
  currentProblemError: false,
  currentProblemOutcomeMessage: "",
};

const currentProblemSlice = createSlice({
  name: "currentProblem",
  initialState,
  reducers: {
    setCurrentProblemId: (state, action) =>{
      state.currentProblemLoading = true;
      state.currentProblemId = action.payload.problemId;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login Thunk
      .addCase(currentProblemThunk.pending, (state)=>{
        state.currentProblemLoading=true;
      })
      .addCase(currentProblemThunk.fulfilled, (state, action) => {
        state.currentProblemLoading = false;
        console.log(JSON.stringify(action));
        state.currentProblemData = action.payload;
      })
      .addCase(currentProblemThunk.rejected, (state, action) => {
        state.currentProblemLoading = false;
        state.currentProblemId = null;
        state.currentProblemError = true;
        console.log(JSON.stringify(action));
      });
  },
});

export default currentProblemSlice.reducer;
export const { setCurrentProblemId } = currentProblemSlice.actions;
