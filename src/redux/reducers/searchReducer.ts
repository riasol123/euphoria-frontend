import { SET_SEARCH_DATA, SetSearchDataPayload } from '../actions/search';

interface SearchState {
  place: string;
  dateRange: any; // уточнить тип если нужно
}

const initialState: SearchState = {
  place: '',
  dateRange: null,
};

export const searchReducer = (state = initialState, action: any): SearchState => {
  switch (action.type) {
    case SET_SEARCH_DATA:
      return {
        ...state,
        place: action.payload.place,
        dateRange: action.payload.dateRange,
      };
    default:
      return state;
  }
};
