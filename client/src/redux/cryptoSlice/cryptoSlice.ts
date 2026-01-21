import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchFavorites, toggleFavoriteAction } from "./asyncActions";
import { CryptoState } from "@/utility/types/reduxTypes";
import { Coin } from "@/features/crypto/types";

const initialState: CryptoState = {
  favorites: [],
  loading: false,
  error: null,
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchFavorites.fulfilled,
        (state, action: PayloadAction<Coin[]>) => {
          state.loading = false;
          state.favorites = action.payload;
        },
      )
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(toggleFavoriteAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleFavoriteAction.fulfilled, (state, action) => {
        state.loading = false;
        const { coinId, isFavorite } = action.payload;

        if (!isFavorite) {
          state.favorites = state.favorites.filter((c) => c.id !== coinId);
        } else {
        }
      })
      .addCase(toggleFavoriteAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default cryptoSlice.reducer;
