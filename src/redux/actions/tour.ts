import { Tour } from '../reducers/tourReducer';
import {
  GET_TOURS_REQUEST,
  GET_TOURS_SUCCESS,
  GET_TOURS_FAILURE,
  CREATE_TOUR_FAILURE,
  CREATE_TOUR_REQUEST,
  CREATE_TOUR_SUCCESS,
  FETCH_BOOKINGS_FAILURE,
  FETCH_BOOKINGS_REQUEST,
  FETCH_BOOKINGS_SUCCESS,
  SET_CURRENT_TOUR,
  SET_TOURS,
  SET_TOURS_ERROR,
  SET_TOURS_LOADING,
} from '../actionTypes';

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

export const getToursRequest = (payload?: any) => ({
  type: GET_TOURS_REQUEST,
  payload,
});

export const getToursSuccess = (tours: Tour[]) => ({
  type: GET_TOURS_SUCCESS,
  payload: tours,
});

export const getToursFailure = (error: string) => ({
  type: GET_TOURS_FAILURE,
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
