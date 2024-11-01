type ApiHeaders = {
  'content-type'?: string;
};

type ApiCallError = { code: number | string; message: string };

type ApiCallParams<Params = {}> = {
  params?: Params;
  timeout?: number;
};

type ApiCallSuccess<T> = {
  success: true;
  responseData: T;
};

type ApiCallFailure = {
  success: false;
  error: ApiCallError;
};

type ApiCallResponse<T> = ApiCallSuccess<T> | ApiCallFailure;

type ApiError = {
  code: number | string;
  message: string;
};
