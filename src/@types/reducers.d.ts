interface ThemeState {
  mode: ThemeMode;
  colors: ThemeColors;
}

interface CounterState {
  value: number;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error?: Partial<ApiCallError>;
}

interface FavoriteState {
  movies: number[];
}
