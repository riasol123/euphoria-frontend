import { SET_SEARCH_DATA } from '../actions/search';

export interface SearchState {
  city?: string;
  dateRange?: any;
  isAccommodation?: boolean;
  categoryIds?: any;
  durationFrom?: number;
  durationTo?: number;
}

const initialState: SearchState = {
  city: '',
  dateRange: null,
  isAccommodation: false,
  categoryIds: null,
  durationFrom: 1,
  durationTo: 30,
};

export const searchReducer = (state = initialState, action: any): SearchState => {
  switch (action.type) {
    case SET_SEARCH_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
