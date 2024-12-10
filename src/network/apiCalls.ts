import { AxiosError } from 'axios';
import ApiConstants from './apiConstants';
import { ErrorHandler } from './errorHandler';
import { _get } from './instanceMethods';
import { QueryFunctionContext } from '@tanstack/react-query';

const { getAllProducts } = ApiConstants.endpoints;

export async function fetchAllProducts({ pageParam }: QueryFunctionContext) {
  console.log(`Fetching all products Page `, pageParam);

  const limit = 10;

  try {
    const response = await _get<GetAllProducts>(getAllProducts, {
      params: {
        limit,
        skip: ((pageParam as number) ?? 1) * limit,
      },
    });
    return response;
  } catch (error) {
    throw ErrorHandler(error as AxiosError);
  }
}
