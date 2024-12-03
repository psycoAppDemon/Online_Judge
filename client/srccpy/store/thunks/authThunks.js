// src/thunks/authThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Login thunk with token handling
export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue, getState }) => {
    try {
      console.log(email, password);

      const response = await axios.post(
        `${API_BASE_URL}/login`,
        { password, email },
        {
          withCredentials: true,
        }
      );
      console.log("Cookie after login:", document.cookie); // Should log token
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data || "Login failed";
      return rejectWithValue({ error: errorMsg });
    }
  }
);

// Signup thunk
export const signupThunk = createAsyncThunk(
  "auth/signup",
  async (
    { firstname, lastname, userId, email, password },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, {
        firstname,
        lastname,
        password,
        userId,
        email,
      });
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data || "Signup failed";
      return rejectWithValue({ error: errorMsg });
    }
  }
);

export const signoutThunk = createAsyncThunk(
  "auth/signout",
  async ({}, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log(JSON.stringify(error));
      const errorMsg = error.response?.data || "Signout failed";
      return rejectWithValue({ error: errorMsg });
    }
  }
);
