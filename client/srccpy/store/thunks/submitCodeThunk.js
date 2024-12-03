// src/thunks/authThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Login thunk with token handling
export const submitCodeThunk = createAsyncThunk(
  "submitCode/submit",
  async (
    { code, language, currentProblemId },
    { rejectWithValue, getState }
  ) => {
    try {
      console.log(code, language, currentProblemId);
      const response = await axios.post(
        `${API_BASE_URL}/submit`,
        { code, language, problemId: currentProblemId },
        { withCredentials: true }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data || "Submission Failed";
      return rejectWithValue({ error: errorMsg });
    }
  }
);
