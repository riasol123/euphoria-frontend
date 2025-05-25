import { Tour } from "../reducers/tourReducer";
import { FETCH_TOURS_REQUEST, FETCH_TOURS_SUCCESS, FETCH_TOURS_FAILURE } from '../actionTypes';

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

export const fetchToursRequest = () => ({
  type: FETCH_TOURS_REQUEST,
});

export const fetchToursSuccess = (tours: Tour[]) => ({
  type: FETCH_TOURS_SUCCESS,
  payload: tours,
});

export const fetchToursFailure = (error: string) => ({
  type: FETCH_TOURS_FAILURE,
  payload: error,
});
