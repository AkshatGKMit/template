interface PaginatedResponse {
  total_pages: number;
  page: number;
}

type Reviews = Review[];

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

type Movies = Movie[];

interface PaginatedMovies extends PaginatedResponse {
  results: Movies;
}

interface AddFavoriteParams {
  movie: Movie;
  favorite: boolean;
}

interface AddFavoriteResponse {
  success: boolean;
  status_code: number;
  status_message: string;
}
