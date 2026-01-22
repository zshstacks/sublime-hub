export interface BinanceTicker {
  s: string; // Symbol (BTCUSDT)
  c: string; // Last Price
  P: string; // Price Change Percent
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Coin {
  id: number;
  symbol: string;
  name: string;
  baseAsset: string;
  rank: number;
  marketCap?: number;
  volume24h?: number;
  categories?: Category[];
  createdAt?: string;
  updatedAt?: string;

  price?: string;
  h24?: string;
  cap?: string;
  vol?: string;
}
