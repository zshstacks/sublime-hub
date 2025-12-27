import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "@/redux/api";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    userData: { email: string; password: string; username: string },
    thunkAPI,
  ) => {
    try {
      const res = await api.post("/register", userData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Register failed");
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await api.post("/login", userData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Login failed");
    }
  },
);

export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/user/current");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to load user data.");
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const res = await api.post("/auth/refresh/logout");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to logout");
    }
  },
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async ({ email, code }: { email: string; code: string }, thunkAPI) => {
    try {
      const res = await api.post("/auth/verify-email", { email, code });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to verify email");
    }
  },
);

export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async (email: string, thunkAPI) => {
    try {
      const res = await api.post("/auth/resend-otp", { email });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to resend confirmation code");
    }
  },
);
