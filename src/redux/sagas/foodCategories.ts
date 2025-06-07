import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchFoodCategoriesSuccess,
  fetchFoodCategoriesFailure,
} from '../actions/foodCategories';
import { FETCH_FOOD_CATEGORIES_REQUEST } from '../actionTypes';

function* fetchFoodCategoriesSaga(): Generator<any, void, any> {
  try {
    const response = yield call(fetch, '/api/food-categories');
    const data = yield call([response, 'json']);
    yield put(fetchFoodCategoriesSuccess(data));
  } catch (error) {
    if (error instanceof Error) {
      yield put(fetchFoodCategoriesFailure(error));
    } else {
      yield put(fetchFoodCategoriesFailure(new Error('Unknown error occurred')));
    }
  }
}

export function* watchFoodCategoriesSaga(): Generator<any, void, any> {
  yield takeLatest(FETCH_FOOD_CATEGORIES_REQUEST, fetchFoodCategoriesSaga);
} 