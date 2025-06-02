// tourReducer.ts
import {
  SET_TOURS,
  SET_TOURS_LOADING,
  SET_TOURS_ERROR,
  FETCH_BOOKINGS_REQUEST,
  FETCH_BOOKINGS_SUCCESS,
  FETCH_BOOKINGS_FAILURE,
  SET_CURRENT_TOUR,
} from '../actions/tour';
import {
  FETCH_TOURS_REQUEST,
  FETCH_TOURS_SUCCESS,
  FETCH_TOURS_FAILURE,
} from '../actionTypes';
import { Booking } from '../../types/tour';

// types.ts
export interface Tour {
  id: number;
  title: string;
  description: string;
  duration: number;
  city: string;
  address: string;
  isAccommodation: boolean;
  isActive: boolean;
  authorId: number;
  photos: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TourState {
  tours: Tour[];
  loading: boolean;
  error: string | null;
  bookings: Booking[];
  bookingsError: string | null;
  currentTour?: any;
}


const initialState: TourState = {
  tours: [],
  loading: false,
  error: null,
  bookings: [],
  bookingsError: null,
  currentTour: null,
};

type Action =
  | { type: typeof SET_TOURS; payload: Tour[] }
  | { type: typeof SET_TOURS_LOADING; payload: boolean }
  | { type: typeof SET_TOURS_ERROR; payload: string }
  | { type: typeof FETCH_TOURS_REQUEST }
  | { type: typeof FETCH_TOURS_SUCCESS; payload: Tour[] }
  | { type: typeof FETCH_TOURS_FAILURE; payload: string }
  | { type: typeof FETCH_BOOKINGS_REQUEST }
  | { type: typeof FETCH_BOOKINGS_SUCCESS; payload: Booking[] }
  | { type: typeof FETCH_BOOKINGS_FAILURE; payload: string }
  | { type: typeof SET_CURRENT_TOUR; payload: any };

export const tourReducer = (state = initialState, action: Action): TourState => {
  switch (action.type) {
    case SET_TOURS:
      return { ...state, tours: action.payload, loading: false, error: null };
    case SET_TOURS_LOADING:
      return { ...state, loading: action.payload };
    case SET_TOURS_ERROR:
      return { ...state, error: action.payload, loading: false };
    case FETCH_TOURS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_TOURS_SUCCESS:
      return { ...state, tours: action.payload, loading: false, error: null };
    case FETCH_TOURS_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case FETCH_BOOKINGS_REQUEST:
      return {
        ...state,
        bookings: [],
        bookingsError: null,
      };
    case FETCH_BOOKINGS_SUCCESS:
      return {
        ...state,
        bookings: action.payload,
        bookingsError: null,
      };
    case FETCH_BOOKINGS_FAILURE:
      return {
        ...state,
        bookings: [],
        bookingsError: action.payload,
      };
    case SET_CURRENT_TOUR:
      return {
        ...state,
        currentTour: action.payload,
      };
    default:
      return state;
  }
};
