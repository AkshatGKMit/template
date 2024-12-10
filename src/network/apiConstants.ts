import { API_BASE_URL, API_BEARER_TOKEN } from '@env';

const ApiConstants = {
  BASE_URL: API_BASE_URL,
  headers: {
    Authorization: API_BEARER_TOKEN,
  },
  endpoints: {
    getAllProducts: 'products',
  },
};

export default ApiConstants;
