import {
  FETCH_FOOD_CATEGORIES_REQUEST,
  FETCH_FOOD_CATEGORIES_SUCCESS,
  FETCH_FOOD_CATEGORIES_FAILURE,
} from '../actionTypes';

export const fetchFoodCategoriesRequest = () => ({
  type: FETCH_FOOD_CATEGORIES_REQUEST,
});

export const fetchFoodCategoriesSuccess = (categories) => ({
  type: FETCH_FOOD_CATEGORIES_SUCCESS,
  payload: categories,
});

export const fetchFoodCategoriesFailure = (error) => ({
  type: FETCH_FOOD_CATEGORIES_FAILURE,
  payload: error,
}); 