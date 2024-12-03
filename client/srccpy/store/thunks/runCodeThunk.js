// src/thunks/authThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Login thunk with token handling
export const runCodeThunk = createAsyncThunk(
  "runCode/run",
  async ({ code, language, input }, { rejectWithValue, getState }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/run`, {
        code,
        language,
        input,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data || "Execution failed";
      return rejectWithValue({ error: errorMsg });
    }
  }
);
