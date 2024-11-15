import instance from './instance';

async function _get<T, Params = {}>(
  url: string,
  config?: ApiCallConfig<Params>,
): Promise<ApiCallResponse<T>> {
  const response = await instance.get(url, config);

  return response.data ?? response;
}

async function _post<T, Body, Params = {}>(
  url: string,
  data: Body,
  config?: ApiCallConfig<Params>,
): Promise<ApiCallResponse<T>> {
  const response = await instance.post(url, data, config);

  return response.data ?? response;
}

async function _put<T, Body, Params = {}>(
  url: string,
  data: Body,
  config?: ApiCallConfig<Params>,
): Promise<ApiCallResponse<T>> {
  const response = await instance.put(url, data, config);

  return response.data ?? response;
}

async function _delete<T, Body, Params = {}>(
  url: string,
  data: Body,
  config?: ApiCallConfig<Params>,
): Promise<ApiCallResponse<T>> {
  const response = await instance.delete(url, { ...config, data });

  return response.data ?? response;
}

export { _get, _delete, _put, _post };
