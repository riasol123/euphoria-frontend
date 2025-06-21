import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { searchReducer } from './searchReducer';
import { tourReducer } from './tourReducer';
import { categoriesReducer } from './categories';
import { foodCategoriesReducer } from './foodCategories';
import { modalReducer } from './modal';

export const rootReducer = combineReducers({
  auth: authReducer,
  search: searchReducer,
  tour: tourReducer,
  categories: categoriesReducer,
  foodCategories: foodCategoriesReducer,
  modal: modalReducer,
}); 