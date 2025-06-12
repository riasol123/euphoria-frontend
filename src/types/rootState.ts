import { CategoriesState } from './category';
import { FoodCategory } from './food/types';

export interface RootState {
  categories: CategoriesState;
  foodCategories: FoodCategory;
} 