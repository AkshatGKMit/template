import { STORE_CONSTANTS } from '@constants';
import createSagaMiddleware from 'redux-saga';
import { put, takeEvery, all, call } from 'redux-saga/effects';

import ApiConstants from '@network/apiConstants';
import { _get } from '@network/instanceMethods';
import { AxiosResponse } from 'axios';

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const { SAGA } = STORE_CONSTANTS.MOVIES;
const { popularMovies } = ApiConstants.endpoints;

function* getMovies() {
  try {
    console.log('Fetching popular movies');

    const response: AxiosResponse<PaginatedMovies> = yield call(_get, popularMovies, {
      params: { page: 1 },
    });

    yield put({ type: SAGA.POPULAR_MOVIES_SUCCESS, data: response.data });
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    yield put({ type: SAGA.POPULAR_MOVIES_FAILURE, error });
  }
}

export function* moviesSaga() {
  yield takeEvery(SAGA.POPULAR_MOVIES_REQUEST, getMovies);
}

function* rootSaga() {
  yield all([moviesSaga()]);
}

export default rootSaga;
