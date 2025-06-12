import { SearchState } from '../../types/search/types';

const initialState: SearchState = {
  city: '',
  dateRange: undefined,
  adults: 2,
  children: 0,
};

export const searchReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_SEARCH_CITY':
      return {
        ...state,
        city: action.payload,
      };
    case 'SET_SEARCH_DATE_RANGE':
      return {
        ...state,
        dateRange: action.payload,
      };
    case 'SET_SEARCH_ADULTS':
      return {
        ...state,
        adults: action.payload,
      };
    case 'SET_SEARCH_CHILDREN':
      return {
        ...state,
        children: action.payload,
      };
    default:
      return state;
  }
};
