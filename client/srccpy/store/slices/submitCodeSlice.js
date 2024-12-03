// src/features/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { submitCodeThunk } from "../thunks/submitCodeThunk";

const initialState = {
  submitCodeLoading: false,
  submitCodeOutput: null,
  submitCodeResponse: null,
};

const submitCodeSlice = createSlice({
  name: "runCode",
  initialState,
  reducers: {
    resetSubmitCodeStates: (state) => {
      state.submitCodeResponse = false;
      state.submitCodeLoading = null;
      state.submitCodeOutput = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login Thunk
      .addCase(submitCodeThunk.pending, (state) => {
        state.submitCodeLoading = true;
      })
      .addCase(submitCodeThunk.fulfilled, (state, action) => {
        state.submitCodeLoading = false;
        state.submitCodeResponse = action.payload.message;
      })
      .addCase(submitCodeThunk.rejected, (state, action) => {
        state.submitCodeLoading = false;
        console.log(action.payload);
        //state.submitCodeOutput = action.payload.error.error;
        state.submitCodeResponse = action.payload.error.message;
        if(state.submitCodeResponse==="Compilation Error"){
            state.submitCodeOutput = action.payload.error.error;
        }
      });
  },
});

export default submitCodeSlice.reducer;
export const { resetSubmitCodeStates } = submitCodeSlice.actions;
