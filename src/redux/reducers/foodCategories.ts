const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const foodCategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_FOOD_CATEGORIES_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_FOOD_CATEGORIES_SUCCESS':
      return { ...state, loading: false, items: action.payload };
    case 'FETCH_FOOD_CATEGORIES_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}; 