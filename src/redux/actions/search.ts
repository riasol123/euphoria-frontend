// src/redux/actions/search.ts

import { SearchState } from "../../types/search/types";

export const SET_SEARCH_DATA = 'SET_SEARCH_DATA';

export const setSearchData = (payload: SearchState) => ({
  type: SET_SEARCH_DATA,
  payload,
});
