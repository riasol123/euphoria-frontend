import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getFoodCategoriesSuccess,
  getFoodCategoriesFailure,
} from '../actions/foodCategories';
import { GET_FOOD_CATEGORIES_REQUEST } from '../actionTypes';

function* foodCategoriesSaga(): Generator<any, void, any> {
  try {
    const response = yield call(fetch, '/api/food-categories');
    const data = yield call([response, 'json']);
    yield put(getFoodCategoriesSuccess(data));
  } catch (error) {
    if (error instanceof Error) {
      yield put(getFoodCategoriesFailure(error));
    } else {
      yield put(getFoodCategoriesFailure(new Error('Unknown error occurred')));
    }
  }
}

export function* watchFoodCategories(): Generator<any, void, any> {
  yield takeLatest(GET_FOOD_CATEGORIES_REQUEST, foodCategoriesSaga);
} 