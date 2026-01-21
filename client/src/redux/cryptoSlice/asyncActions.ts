import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/redux/api";

export const fetchFavorites = createAsyncThunk(
  "crypto/fetchFavorites",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/api/crypto/user/favorites");
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "Failed to fetch favorites",
      );
    }
  },
);

export const toggleFavoriteAction = createAsyncThunk(
  "crypto/toggleFavorite",
  async (coinId: number, thunkAPI) => {
    try {
      const res = await api.post("/api/crypto/user/favorites", {
        coin_id: coinId,
      });

      await thunkAPI.dispatch(fetchFavorites());

      return {
        coinId,
        isFavorite: res.data.isFavorite,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "Failed to toggle favorite",
      );
    }
  },
);
