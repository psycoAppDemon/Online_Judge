import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3050/login",
        { password, email },
        { withCredentials: true } // This allows sending cookies with the request
      );
      const token = response.data.token;
      document.cookie = `token=${token};path=/`; // Set cookie for 1 day
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const signupThunk = createAsyncThunk(
    "auth/signup",
    async ({ firstname, lastname, userId, email, password }, { rejectWithValue }) => {
      try {
        const response = await axios.post("http://localhost:3050/register", {
          firstname,
          lastname,
          password,
          userId,
          email,
        });
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  