import { STORE_CONSTANTS } from '@constants';

const { SAGA } = STORE_CONSTANTS.MOVIES;

export const getPopularMovies = () => {
  return { type: SAGA.POPULAR_MOVIES_REQUEST };
};
