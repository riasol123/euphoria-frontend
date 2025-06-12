import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getCategoriesSuccess,
  getCategoriesFailure,
} from '../actions/categories';
import { GET_CATEGORIES_REQUEST } from '../actionTypes';
import { Category } from '../../types/category';
import { getCategories } from '../api/categories';

function* categoriesSaga(): Generator<any, void, any> {
  try {
    const response = yield call(getCategories);
    yield put(getCategoriesSuccess(response as Category[]));
  } catch (error: any) {
    yield put(getCategoriesFailure(error.message));
  }
}

export function* watchCategories(): Generator<any, void, any> {
  yield takeLatest(GET_CATEGORIES_REQUEST, categoriesSaga);
} 