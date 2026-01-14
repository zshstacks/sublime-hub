import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/redux/api";

export const createMonitor = createAsyncThunk(
  "monitor/create",
  async (
    data: {
      name: string;
      type: string;
      url: string;
      timeout: number;
      interval: number;
      notify_email: boolean;
    },
    thunkAPI,
  ) => {
    try {
      const res = await api.post("/api/monitors", data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to create a new monitor");
    }
  },
);

export const fetchMonitors = createAsyncThunk(
  "monitor/fetchMonitors",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/api/monitors");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch  monitors");
    }
  },
);

export const fetchMonitorStats = createAsyncThunk(
  "monitor/fetchMonitorStats",
  async ({ id, period }: { id: string; period: string }, thunkAPI) => {
    try {
      const res = await api.get(`/api/monitors/${id}/stats?period=${period}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch monitors stats");
    }
  },
);

export const deleteMonitor = createAsyncThunk(
  "monitor/deleteMonitor",
  async (id: string, thunkAPI) => {
    try {
      const res = await api.delete(`/api/monitors/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to delete monitor");
    }
  },
);

export const chartMonitorStats = createAsyncThunk(
  "monitor/chartMonitorStats",
  async (id: string, thunkAPI) => {
    try {
      const res = await api.get(`/api/monitors/${id}/chart`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch chart monitor stats");
    }
  },
);

export const updateMonitor = createAsyncThunk(
  "monitor/updateMonitor",
  async (
    {
      id,
      data,
    }: {
      id: string;
      data: {
        name: string;
        url: string;
        timeout: number;
        interval: number;
        is_active: boolean;
        notify_email: boolean;
      };
    },
    thunkAPI,
  ) => {
    try {
      const res = await api.patch(`/api/monitors/${id}`, data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to update monitor ");
    }
  },
);
