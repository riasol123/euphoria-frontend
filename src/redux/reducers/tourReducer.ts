// tourReducer.ts
import {
  SET_TOURS,
  SET_TOURS_LOADING,
  SET_TOURS_ERROR,
} from '../actions/tour';
import {
  FETCH_TOURS_REQUEST,
  FETCH_TOURS_SUCCESS,
  FETCH_TOURS_FAILURE,
} from '../actionTypes';

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
}


const initialState: TourState = {
  tours: [],
  loading: false,
  error: null,
};

type Action =
  | { type: typeof SET_TOURS; payload: Tour[] }
  | { type: typeof SET_TOURS_LOADING; payload: boolean }
  | { type: typeof SET_TOURS_ERROR; payload: string }
  | { type: typeof FETCH_TOURS_REQUEST }
  | { type: typeof FETCH_TOURS_SUCCESS; payload: Tour[] }
  | { type: typeof FETCH_TOURS_FAILURE; payload: string };

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
    default:
      return state;
  }
};
