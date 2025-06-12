import {
  GET_FOOD_CATEGORIES_REQUEST,
  GET_FOOD_CATEGORIES_SUCCESS,
  GET_FOOD_CATEGORIES_FAILURE,
} from '../actionTypes';
import { FoodCategory } from '../../types/food/types';

export const getFoodCategoriesRequest = () => ({
  type: GET_FOOD_CATEGORIES_REQUEST,
});

export const getFoodCategoriesSuccess = (categories: FoodCategory[]) => ({
  type: GET_FOOD_CATEGORIES_SUCCESS,
  payload: categories,
});

export const getFoodCategoriesFailure = (error: Error) => ({
  type: GET_FOOD_CATEGORIES_FAILURE,
  payload: error,
}); 