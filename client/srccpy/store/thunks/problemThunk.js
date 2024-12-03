// src/thunks/authThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const problemListThunk = createAsyncThunk(
  "problem/problemList",
  async (_, { rejectWithValue }) => {
    // No need for destructured params here
    try {
      const response = await axios.get(`${API_BASE_URL}/home`, {
        withCredentials: true,
      });
      return response.data; // Returning the fetched data
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to load data";
      console.error("Error fetching problem list:", error);
      return rejectWithValue(errorMsg);
    }
  }
);
