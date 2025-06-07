import {
  FETCH_FOOD_CATEGORIES_REQUEST,
  FETCH_FOOD_CATEGORIES_SUCCESS,
  FETCH_FOOD_CATEGORIES_FAILURE,
} from '../actionTypes';
import { FoodCategory } from '../../types/food/types';

export const fetchFoodCategoriesRequest = () => ({
  type: FETCH_FOOD_CATEGORIES_REQUEST,
});

export const fetchFoodCategoriesSuccess = (categories: FoodCategory[]) => ({
  type: FETCH_FOOD_CATEGORIES_SUCCESS,
  payload: categories,
});

export const fetchFoodCategoriesFailure = (error: Error) => ({
  type: FETCH_FOOD_CATEGORIES_FAILURE,
  payload: error,
}); 