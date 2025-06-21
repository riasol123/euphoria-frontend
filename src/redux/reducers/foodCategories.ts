import { FoodCategory } from '../../types/food/types';
import {
  GET_FOOD_CATEGORIES_REQUEST,
  GET_FOOD_CATEGORIES_SUCCESS,
  GET_FOOD_CATEGORIES_FAILURE,
} from '../actionTypes';

interface FoodCategoriesState {
  categories: FoodCategory[];
  loading: boolean;
  error: Error | null;
}

const initialState: FoodCategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

export const foodCategoriesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_FOOD_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_FOOD_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload.data,
      };
    case GET_FOOD_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}; 