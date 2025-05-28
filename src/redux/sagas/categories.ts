import { call, put, takeLatest } from 'redux-saga/effects';
import { api } from '../../utils/api';
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from '../actions/categories';
import { FETCH_CATEGORIES_REQUEST } from '../actionTypes';
import { Category } from '../../types/category';

function* fetchCategories(): Generator<any, void, any> {
  try {
    const response = yield call(api.get, '/categories');
    yield put(fetchCategoriesSuccess(response.data as Category[]));
  } catch (error: any) {
    yield put(fetchCategoriesFailure(error.message));
  }
}

export function* categoriesSaga(): Generator<any, void, any> {
  yield takeLatest(FETCH_CATEGORIES_REQUEST, fetchCategories);
} 