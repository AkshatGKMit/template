import { API_BASE_URL, API_BEARER_TOKEN } from '@env';

const ApiConstants = {
  BASE_URL: API_BASE_URL,
  headers: {
    Authorization: API_BEARER_TOKEN,
  },
  imageSecureBaseUrl: 'https://image.tmdb.org/t/p/',
  endpoints: {
    popularMovies: 'movie/popular',
    addFavorite: 'account/21352023/favorite',
    getFavorite: 'account/21352023/favorite/movies',
  },
  imageSizes: {
    logo: {
      w45: 'w45',
      w92: 'w92',
      w154: 'w154',
      original: 'original',
    },
    poster: {
      w92: 'w92',
      w154: 'w154',
      w185: 'w185',
      w342: 'w342',
      w500: 'w500',
      w780: 'w780',
      original: 'original',
    },
    profile: {
      w45: 'w45',
      w185: 'w185',
      h632: 'h632',
      original: 'original',
    },
    still: {
      w92: 'w92',
      w185: 'w185',
      w300: 'w300',
      original: 'original',
    },
  },
};

export default ApiConstants;
