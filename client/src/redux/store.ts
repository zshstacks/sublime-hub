import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/authSlice";
import monitorReducer from "./monitorSlice/monitorSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    monitor: monitorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
