import { PostArray } from '../../types/getPosts/types';

import { POSTS_RECEIVED, POSTS_FAILED, POSTS_REQUESTED } from '../actionTypes';

interface NewsReceivedAction {
  type: typeof POSTS_RECEIVED;
  payload: PostArray;
}

interface NewsFailedAction {
  type: typeof POSTS_FAILED;
  error: string | null;
}

export const getPostList = () => ({
  type: POSTS_REQUESTED,
});

export const postsReceived = (payload: PostArray): NewsReceivedAction => ({
  type: POSTS_RECEIVED,
  payload,
});

export const postsFailed = (error: string | null): NewsFailedAction => ({
  type: POSTS_FAILED,
  error,
});
