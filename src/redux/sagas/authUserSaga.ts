import { call, put, takeLatest } from 'redux-saga/effects';

import { AuthUserAction } from '../../types/auth/types';

import getVerifyUser from '../api/getPosts/getAuthUser';
import { authFailed, authReceived } from '../actions/auth';
import { AUTH_VERIFY_REQUESTED } from '../actionTypes';
import { AxiosError } from 'axios';

function* authUserWorker() {
  try {
    const data: AuthUserAction = yield call(getVerifyUser);
    yield put(authReceived(data));
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      yield put(authFailed(error.message));
    }
  }
}

export default function* authUserWatcher() {
  yield takeLatest(AUTH_VERIFY_REQUESTED, authUserWorker);
}
