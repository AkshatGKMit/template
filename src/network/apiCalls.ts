import { AxiosError } from 'axios';
import ApiConstants from './apiConstants';
import { ErrorHandler } from './errorHandler';
import { _get } from './instanceMethods';
import { QueryFunctionContext, QueryKey } from '@tanstack/react-query';

const { popularMovies } = ApiConstants.endpoints;

export async function fetchPopularMovie(page: number) {
  const limit = 10;

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
