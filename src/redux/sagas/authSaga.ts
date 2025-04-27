import { call, put, select, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';

import { AuthAction, AuthInformation } from '../../types/auth/types';

import { authFailed, authReceived } from '../actions/auth';
import getAuthData from '../api/getPosts/getAuthData';
import { AUTH_REQUESTED } from '../actionTypes';
import { changeModalProps } from '../actions/modal';

function* authWorker({ payload }: AuthAction) {
  try {
    const requestType: string = yield select((state) => state.modal.modalType);
    const data: AuthInformation = yield call(getAuthData, payload, requestType);
    yield put(authReceived(data.user));
    localStorage.setItem('authToken', data.token);
    yield put(changeModalProps({ isOpen: false, type: '' }));
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      yield put(authFailed(error.response?.data.message));
    }
  }
}

export default function* authWatcher() {
  yield takeLatest(AUTH_REQUESTED, authWorker);
}
