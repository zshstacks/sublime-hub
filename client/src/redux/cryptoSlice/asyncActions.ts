import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/redux/api";
import { Coin } from "@/features/crypto/types";

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

export const fetchMarketStats = createAsyncThunk(
  "crypto/fetchMarketStats",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/api/crypto/market-stats");
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "Failed to fetch market stats",
      );
    }
  },
);

const formatMarketCap = (cap: number | undefined): string => {
  if (!cap) return "---";

  if (cap >= 1_000_000_000_000) {
    return `$${(cap / 1_000_000_000_000).toFixed(2)}T`;
  } else if (cap >= 1_000_000_000) {
    return `$${(cap / 1_000_000_000).toFixed(2)}B`;
  } else if (cap >= 1_000_000) {
    return `$${(cap / 1_000_000).toFixed(2)}M`;
  } else if (cap >= 1_000) {
    return `$${(cap / 1_000).toFixed(2)}K`;
  }
  return `$${cap.toFixed(2)}`;
};

export const fetchTrendingCoins = createAsyncThunk(
  "crypto/fetchTrendingCoins",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/api/crypto/coins");
      const allCoins: Coin[] = res.data;

      const coinsWithData = allCoins.filter(
        (coin) => coin.marketCap && coin.marketCap > 0,
      );

      const coinsWithFormattedData = coinsWithData.map((coin) => ({
        ...coin,
        cap: formatMarketCap(coin.marketCap),
        price: coin.price || "---",
        h24: coin.h24 || "0.00%",
      }));

      const trending = [...coinsWithFormattedData]
        .sort((a, b) => (b.marketCap || 0) - (a.marketCap || 0))
        .slice(0, 10);

      const gainers = [...coinsWithFormattedData]
        .sort((a, b) => (b.volume24h || 0) - (a.volume24h || 0))
        .slice(0, 10);

      return { trending, gainers };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "Failed to fetch trending coins",
      );
    }
  },
);

export const fetchCategories = createAsyncThunk(
  "crypto/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/api/crypto/categories");
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "Failed to fetch categories",
      );
    }
  },
);

export const fetchFilteredCoins = createAsyncThunk(
  "crypto/fetchFilteredCoins",
  async (params: { filter?: string; category?: string }, thunkAPI) => {
    try {
      const queryParams = new URLSearchParams();
      if (params.filter && params.filter !== "all") {
        queryParams.append("filter", params.filter);
      }
      if (params.category && params.category !== "all") {
        queryParams.append("category", params.category);
      }

      const res = await api.get(`/api/crypto/coins?${queryParams.toString()}`);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "Failed to fetch coins",
      );
    }
  },
);
