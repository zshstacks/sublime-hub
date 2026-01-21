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

export interface CryptoState {
  favorites: any[];
  loading: boolean;
  error: string | null;
}
