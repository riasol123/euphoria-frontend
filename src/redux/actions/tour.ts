import { Tour } from "../reducers/tourReducer";
import { FETCH_TOURS_REQUEST, FETCH_TOURS_SUCCESS, FETCH_TOURS_FAILURE } from '../actionTypes';

// actions.ts
export const SET_TOURS = 'SET_TOURS';
export const SET_TOURS_LOADING = 'SET_TOURS_LOADING';
export const SET_TOURS_ERROR = 'SET_TOURS_ERROR';
export const CREATE_TOUR_REQUEST = 'CREATE_TOUR_REQUEST';
export const CREATE_TOUR_SUCCESS = 'CREATE_TOUR_SUCCESS';
export const CREATE_TOUR_FAILURE = 'CREATE_TOUR_FAILURE';
export const SET_CURRENT_TOUR = 'SET_CURRENT_TOUR';

// BOOKINGS
export const FETCH_BOOKINGS_REQUEST = 'FETCH_BOOKINGS_REQUEST';
export const FETCH_BOOKINGS_SUCCESS = 'FETCH_BOOKINGS_SUCCESS';
export const FETCH_BOOKINGS_FAILURE = 'FETCH_BOOKINGS_FAILURE';

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

export const fetchToursRequest = (payload?: any) => ({
  type: FETCH_TOURS_REQUEST,
  payload,
});

export const fetchToursSuccess = (tours: Tour[]) => ({
  type: FETCH_TOURS_SUCCESS,
  payload: tours,
});

export const fetchToursFailure = (error: string) => ({
  type: FETCH_TOURS_FAILURE,
  payload: error,
});

export const createTourRequest = (payload: any) => ({
  type: CREATE_TOUR_REQUEST,
  payload,
});

export const createTourSuccess = (tour: any) => ({
  type: CREATE_TOUR_SUCCESS,
  payload: tour,
});

export const createTourFailure = (error: string) => ({
  type: CREATE_TOUR_FAILURE,
  payload: error,
});

export const fetchBookingsRequest = () => ({
  type: FETCH_BOOKINGS_REQUEST,
});

export const fetchBookingsSuccess = (bookings: any[]) => ({
  type: FETCH_BOOKINGS_SUCCESS,
  payload: bookings,
});

export const fetchBookingsFailure = (error: string) => ({
  type: FETCH_BOOKINGS_FAILURE,
  payload: error,
});

export const setCurrentTour = (tour: any) => ({
  type: SET_CURRENT_TOUR,
  payload: tour,
});
