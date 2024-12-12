import { STORE_CONSTANTS } from '@constants';

const initialState: MoviesState = {
  loading: false,
  movies: [],
  error: null,
};

const { POPULAR_MOVIES_FAILURE, POPULAR_MOVIES_REQUEST, POPULAR_MOVIES_SUCCESS } =
  STORE_CONSTANTS.MOVIES.SAGA;

const moviesReducer = (state = initialState, action: any): MoviesState => {
  switch (action.type) {
    case POPULAR_MOVIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case POPULAR_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: action.data.results,
      };
    case POPULAR_MOVIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default moviesReducer;
