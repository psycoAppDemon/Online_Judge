import { createSlice } from '@reduxjs/toolkit';
import { loginThunk, signupThunk } from '../thunks/authThunks';
import Cookies from 'js-cookie';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    loading: false,
    error: null,
    userId: null,
    emailId: null,
    user_id:null,
    role:null,
  },
  reducers: {
    logout: (state) => {
      state.userId = null;
      state.token = null;
      Cookies.remove('token');
      state.emailId = null;
      state.user_id = null;
      state.role = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.userId = action.payload.userId;
        state.user_id= action.payload._id;
        state.token = action.payload.token;
        state.emailId = action.payload.email;
        state.role = action.payload.role;
        Cookies.set('token', action.payload.token);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signupThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.userId = action.payload.userId;
        state.user_id= action.payload._id;
        state.token = action.payload.token;
        state.emailId = action.payload.email;
        state.role = action.payload.role;
        Cookies.set('token', action.payload.token);
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
