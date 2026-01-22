import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchFavorites,
  toggleFavoriteAction,
  fetchMarketStats,
  fetchTrendingCoins,
  fetchCategories,
  fetchFilteredCoins,
} from "./asyncActions";
import { CryptoState } from "@/utility/types/reduxTypes";
import { Coin } from "@/features/crypto/types";

export interface MarketStats {
  totalMarketCap: number;
  marketCapChange: number;
  volume24h: number;
  btcDominance: number;
  ethGasPrice: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

interface CryptoStateWithStats extends CryptoState {
  marketStats: MarketStats | null;
  statsLoading: boolean;
  trendingCoins: Coin[];
  topGainers: Coin[];
  trendingLoading: boolean;
  categories: Category[];
  categoriesLoading: boolean;
  filteredCoins: Coin[];
  filteredCoinsLoading: boolean;
}

const initialState: CryptoStateWithStats = {
  favorites: [],
  loading: false,
  error: null,
  marketStats: null,
  statsLoading: false,
  trendingCoins: [],
  topGainers: [],
  trendingLoading: false,
  categories: [],
  categoriesLoading: false,
  filteredCoins: [],
  filteredCoinsLoading: false,
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Favorites
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

      // Toggle Favorite
      .addCase(toggleFavoriteAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleFavoriteAction.fulfilled, (state, action) => {
        state.loading = false;
        const { coinId, isFavorite } = action.payload;

        if (!isFavorite) {
          state.favorites = state.favorites.filter((c) => c.id !== coinId);
        }
      })
      .addCase(toggleFavoriteAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Market Stats
      .addCase(fetchMarketStats.pending, (state) => {
        state.statsLoading = true;
      })
      .addCase(
        fetchMarketStats.fulfilled,
        (state, action: PayloadAction<MarketStats>) => {
          state.statsLoading = false;
          state.marketStats = action.payload;
        },
      )
      .addCase(fetchMarketStats.rejected, (state, action) => {
        state.statsLoading = false;
        state.error = action.payload as string;
      })

      // Trending Coins
      .addCase(fetchTrendingCoins.pending, (state) => {
        state.trendingLoading = true;
      })
      .addCase(
        fetchTrendingCoins.fulfilled,
        (
          state,
          action: PayloadAction<{ trending: Coin[]; gainers: Coin[] }>,
        ) => {
          state.trendingLoading = false;
          state.trendingCoins = action.payload.trending;
          state.topGainers = action.payload.gainers;
        },
      )
      .addCase(fetchTrendingCoins.rejected, (state, action) => {
        state.trendingLoading = false;
        state.error = action.payload as string;
      })

      // Categories
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesLoading = true;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.categoriesLoading = false;
          state.categories = action.payload;
        },
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categoriesLoading = false;
        state.error = action.payload as string;
      })

      // Filtered Coins
      .addCase(fetchFilteredCoins.pending, (state) => {
        state.filteredCoinsLoading = true;
      })
      .addCase(
        fetchFilteredCoins.fulfilled,
        (state, action: PayloadAction<Coin[]>) => {
          state.filteredCoinsLoading = false;
          state.filteredCoins = action.payload;
        },
      )
      .addCase(fetchFilteredCoins.rejected, (state, action) => {
        state.filteredCoinsLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default cryptoSlice.reducer;
