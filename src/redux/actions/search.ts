// src/redux/actions/search.ts

export const SET_SEARCH_DATA = 'SET_SEARCH_DATA';

export interface SetSearchDataPayload {
  place: string;
  dateRange: any; // Лучше уточнить тип через dayjs
}

export const setSearchData = (payload: SetSearchDataPayload) => ({
  type: SET_SEARCH_DATA,
  payload,
});
