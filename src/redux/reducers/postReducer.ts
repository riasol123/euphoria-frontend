import { PostInfo, PostInitialState } from '../../types/getPosts/types.js';

import {
  POSTS_REQUESTED,
  POSTS_RECEIVED,
  POSTS_FAILED,
} from '../actionTypes.js';

const initialState: PostInitialState = {
  posts: [],
  isLoading: false,
  error: null,
};

export default function postReducer(state = initialState, action: PostInfo) {
  switch (action.type) {
    case POSTS_REQUESTED:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case POSTS_RECEIVED:
      return {
        ...state,
        isLoading: false,
        posts: action.payload,
        error: null,
      };
    case POSTS_FAILED:
      return {
        ...state,
        isLoading: false,
        posts: [],
        error: action.error,
      };
    default:
      return state;
  }
}
