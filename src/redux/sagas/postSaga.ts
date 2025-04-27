import { takeLatest, put, call } from 'redux-saga/effects';
import { AxiosError } from 'axios';

import { PostArray } from '../../types/getPosts/types';

import getPosts from '../api/getPosts/getPosts';
import { postsFailed, postsReceived } from '../actions/posts';
import { POSTS_REQUESTED } from '../actionTypes';

function* postsWorker() {
  try {
    const data: PostArray = yield call(getPosts);
    yield put(postsReceived(data));
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      yield put(postsFailed(error.message));
    }
  }
}

export default function* postsWatcher() {
  yield takeLatest(POSTS_REQUESTED, postsWorker);
}
