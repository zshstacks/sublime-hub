export interface BinanceTicker {
  s: string; // Symbol (BTCUSDT)
  c: string; // Last Price
  P: string; // Price Change Percent
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Coin {
  id: number;
  symbol: string;
  name: string;
  baseAsset: string;
  rank: number;
  categories?: Category[];
  createdAt?: string;
  updatedAt?: string;
  // WebSocket live data fields
  price?: string;
  h24?: string;
  cap?: string;
}
