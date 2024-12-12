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

interface MoviesState {
  loading: boolean;
  movies: Movie[]; // Assuming Movie is defined elsewhere
  error: string | null;
}
