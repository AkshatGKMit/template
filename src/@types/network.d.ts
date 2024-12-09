import { AxiosRequestConfig } from 'axios';

declare global {
  type ApiCallError = { code: number | string; message: string };

  interface ApiCallConfig<Params = {}> extends AxiosRequestConfig {
    params?: Params;
  }
}
