export interface Category {
  id: number;
  title: string;
  description: string;
  iconPath: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesState {
  items: Category[];
  loading: boolean;
  error: string | null;
} 