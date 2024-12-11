import axios from 'axios';

import ApiConstants from './apiConstants';

const { BASE_URL, headers } = ApiConstants;

const instance = axios.create({
  baseURL: BASE_URL,
  headers,
});

instance.interceptors.request.use((value) => {
  console.log(value.url);
  return value;
});

export default instance;
