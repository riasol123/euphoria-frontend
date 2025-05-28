import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import { categoriesSaga } from './categories';
import { toursSaga } from './tours';

export function* rootSaga() {
  yield all([
    authSaga(),
    categoriesSaga(),
    toursSaga(),
  ]);
} 