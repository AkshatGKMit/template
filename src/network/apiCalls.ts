import { AxiosError } from 'axios';
import { QueryFunctionContext, QueryKey } from '@tanstack/react-query';

import ApiConstants from './apiConstants';
import { ErrorHandler } from './errorHandler';
import { _get, _post } from './instanceMethods';

const { popularMovies, addFavorite, getFavorite } = ApiConstants.endpoints;

export async function fetchPopularMovie(page: number) {
  try {
    const response = await _get<PaginatedMovies>(popularMovies, {
      params: {
        page,
      },
    });

    return response;
  } catch (error) {
    throw ErrorHandler(error as AxiosError);
  }
}

export async function fetchPopularMoviesInfinitely({
  pageParam,
}: QueryFunctionContext<QueryKey, number>) {
  return await fetchPopularMovie(pageParam ?? 1);
}

export async function fetchFavorites(page: number) {
  const params = { page };

  const response = await _get<PaginatedMovies>(getFavorite, { params });

  return response;
}

export async function fetchFavoritesInfinitely({
  pageParam,
}: QueryFunctionContext<QueryKey, number>) {
  return await fetchFavorites(pageParam ?? 1);
}

export async function mutateAddFavorites(media_id: number, favorite: boolean) {
  const body = { media_id, favorite, media_type: 'movie' };

  try {
    const response = await _post<AddFavoriteResponse>(addFavorite, body);

    return response;
  } catch (error) {
    throw ErrorHandler(error as AxiosError);
  }
}
