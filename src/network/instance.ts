import axios, { AxiosError, AxiosResponse } from 'axios';
import { ErrorHandler } from './errorHandler';
import ApiConstants from './apiConstants';

const { BASE_URL, headers } = ApiConstants;

const instance = axios.create({
  baseURL: BASE_URL,
  headers,
});

function interceptorResponse<T>(
  response: AxiosResponse<ApiCallResponse<T>>,
): AxiosResponse<ApiCallResponse<T>> {
  if (!response.data) {
    throw new Error(response.statusText || 'Unknown error occurred');
  }

  const apiSuccess: ApiCallSuccess<T> = { success: true, responseData: response.data as T };
  return { ...response, data: apiSuccess };
}

function interceptorError(error: AxiosError): ApiCallFailure {
  const apiError = ErrorHandler(error);

  const apiFailure: ApiCallFailure = { success: false, error: apiError };
  return apiFailure;
}

instance.interceptors.response.use(interceptorResponse, interceptorError);

async function _get<T, Params = {}>(
  url: string,
  config?: ApiCallParams<Params>,
): Promise<ApiCallResponse<T>> {
  const response = await instance.get(url, config);

  return response.data ?? response;
}

async function _post<T, Body, Params = {}>(
  url: string,
  data: Body,
  config?: ApiCallParams<Params>,
): Promise<ApiCallResponse<T>> {
  const response = await instance.post(url, data, config);

  return response.data ?? response;
}

async function _put<T, Body, Params = {}>(
  url: string,
  data: Body,
  config?: ApiCallParams<Params>,
): Promise<ApiCallResponse<T>> {
  const response = await instance.put(url, data, config);

  return response.data ?? response;
}

async function _delete<T, Body, Params = {}>(
  url: string,
  data: Body,
  config?: ApiCallParams<Params>,
): Promise<ApiCallResponse<T>> {
  const response = await instance.delete(url, { ...config, data });

  return response.data ?? response;
}

export { _get, _delete, _put, _post };

export default instance;
