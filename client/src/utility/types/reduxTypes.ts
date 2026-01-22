import { Category, Coin } from "@/features/crypto/types";

interface UserType {
  id: number;
  uniqueID: string;
  email: string;
  username: string;
  createdAt: Date;
}

export interface AuthState {
  user: UserType | null;
  error: string | null;
  isLoading: boolean;
}

export interface MonitorState {
  items: any[];
  chartData: any[];
  stats: any | null;
  loading: boolean;
  error: string | null;
}

export interface MarketStats {
  totalMarketCap: number;
  marketCapChange: number;
  volume24h: number;
  btcDominance: number;
  ethGasPrice: number;
}

export interface CryptoState {
  favorites: Coin[];
  loading: boolean;
  error: string | null;
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
