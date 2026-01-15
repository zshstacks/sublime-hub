import { MonitorState } from "@/utility/types/reduxTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  chartMonitorStats,
  createMonitor,
  deleteMonitor,
  fetchMonitors,
  fetchMonitorStats,
  updateMonitor,
} from "@/redux/monitorSlice/asyncActions";

const initialState: MonitorState = {
  items: [],
  stats: null,
  chartData: [],
  loading: false,
  error: null,
};

const monitorSlice = createSlice({
  name: "monitor",
  initialState,
  reducers: {
    clearStats: (state) => {
      state.stats = null;
      state.chartData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch monitors
      .addCase(fetchMonitors.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchMonitors.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.loading = false;
          state.items = action.payload;
          state.error = null;
        },
      )
      .addCase(fetchMonitors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create Monitor
      .addCase(createMonitor.pending, (state) => {
        state.loading = true;
      })
      .addCase(createMonitor.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.items.unshift(action.payload);
      })
      .addCase(createMonitor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //  Fetch stats
      .addCase(
        fetchMonitorStats.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.stats = action.payload;
        },
      )

      // Chart Stats
      .addCase(
        chartMonitorStats.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.loading = false;
          state.chartData = action.payload;
        },
      )

      // Update Monitor -
      .addCase(updateMonitor.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const index = state.items.findIndex(
          (item) => item.ID === action.payload.ID,
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      //Delete Monitor
      .addCase(deleteMonitor.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMonitor.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.meta.arg;
        state.items = state.items.filter((item) => item.ID !== deletedId);
      })
      .addCase(deleteMonitor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearStats } = monitorSlice.actions;
export default monitorSlice.reducer;
