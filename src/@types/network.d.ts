type ApiCallError = { code: number | string; message: string };

type ApiCallConfig<Params = {}> = {
  params?: Params;
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
