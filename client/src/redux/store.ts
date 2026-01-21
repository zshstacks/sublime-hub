import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/authSlice";
import monitorReducer from "./monitorSlice/monitorSlice";
import cryptoReducer from "./cryptoSlice/cryptoSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    monitor: monitorReducer,
    crypto: cryptoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
