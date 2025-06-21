import { SearchState } from '../../types/search/types';

const initialState: SearchState = {
  city: '',
  dateRange: undefined,
  people: 2,
};

export const searchReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_SEARCH_DATA':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
