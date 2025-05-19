// tourReducer.ts
import {
  SET_TOURS,
  SET_TOURS_LOADING,
  SET_TOURS_ERROR,
} from '../actions/tour';

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
  | { type: typeof SET_TOURS_ERROR; payload: string };

export const tourReducer = (state = initialState, action: Action): TourState => {
  switch (action.type) {
    case SET_TOURS:
      return { ...state, tours: action.payload, loading: false, error: null };
    case SET_TOURS_LOADING:
      return { ...state, loading: action.payload };
    case SET_TOURS_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
