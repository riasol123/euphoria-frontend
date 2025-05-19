import { Tour } from "../reducers/tourReducer";

// actions.ts
export const SET_TOURS = 'SET_TOURS';
export const SET_TOURS_LOADING = 'SET_TOURS_LOADING';
export const SET_TOURS_ERROR = 'SET_TOURS_ERROR';

export const setTours = (tours: Tour[]) => ({
  type: SET_TOURS,
  payload: tours,
});

export const setToursLoading = (loading: boolean) => ({
  type: SET_TOURS_LOADING,
  payload: loading,
});

export const setToursError = (error: string) => ({
  type: SET_TOURS_ERROR,
  payload: error,
});
