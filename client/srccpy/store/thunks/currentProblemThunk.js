import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const currentProblemThunk = createAsyncThunk(
  "currentProblem/currentProblemDetail",
  async ({ problemId }, { rejectWithValue }) => {
    // No need for destructured params here
    try {
      const response = await axios.get(`${API_BASE_URL}/${problemId}`, {
        withCredentials: true,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to load data";
      console.error("Error fetching problem list:", error);
      return rejectWithValue(errorMsg);
    }
  }
);
