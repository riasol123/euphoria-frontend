import { call, put, takeLatest } from 'redux-saga/effects';
import { api } from '../../utils/api';
import {
  fetchFoodCategoriesSuccess,
  fetchFoodCategoriesFailure,
} from '../actions/foodCategories';
import { FETCH_FOOD_CATEGORIES_REQUEST } from '../actionTypes';

function* fetchFoodCategories() {
  try {
    const response = yield call(api.get, '/food-category');
    yield put(fetchFoodCategoriesSuccess(response.data));
  } catch (error) {
    yield put(fetchFoodCategoriesFailure(error.message));
  }
}

export function* foodCategoriesSaga() {
  yield takeLatest(FETCH_FOOD_CATEGORIES_REQUEST, fetchFoodCategories);
} 