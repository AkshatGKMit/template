import { AxiosError } from 'axios';
import ApiConstants from './apiConstants';
import { ErrorHandler } from './errorHandler';
import { _get } from './instanceMethods';
import { QueryFunctionContext, QueryKey } from '@tanstack/react-query';

const { getAllProducts } = ApiConstants.endpoints;

export async function fetchAllProducts(page: number) {
  const limit = 10;

  try {
    const response = await _get<GetAllProducts>(getAllProducts, {
      params: {
        limit,
        skip: page * limit,
      },
    });
    return response;
  } catch (error) {
    throw ErrorHandler(error as AxiosError);
  }
}

export async function fetchAllInfiniteProducts({
  pageParam,
}: QueryFunctionContext<QueryKey, number>) {
  return await fetchAllProducts(pageParam ?? 1);
}
