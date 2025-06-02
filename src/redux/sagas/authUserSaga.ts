import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../api/api';
import { WHOAMI_REQUEST } from '../actionTypes';
import { whoamiSuccess, whoamiFailure } from '../actions/auth';
import { USER_UPDATE_REQUEST, userUpdateSuccess, userUpdateFailure } from '../actions/auth';
import { USER_PASSWORD_CHANGE_REQUEST, userPasswordChangeSuccess, userPasswordChangeFailure } from '../actions/auth';

function* whoamiSaga(): Generator<any, void, any> {
  try {
    const response = yield call(api.get, '/auth/whoami');
    yield put(whoamiSuccess(response.data));
  } catch (error: any) {
    yield put(whoamiFailure(error.message));
  }
}

function* userUpdateSaga(action: any): Generator<any, void, any> {
  try {
    const token = localStorage.getItem('token');
    const response = yield call(
      api.patch,
      '/user/personal-info',
      action.payload,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    yield put(userUpdateSuccess(response.data));
  } catch (error: any) {
    yield put(userUpdateFailure(error.message));
  }
}

function* userPasswordChangeSaga(action: any): Generator<any, void, any> {
  try {
    const token = localStorage.getItem('token');
    yield call(
      api.patch,
      '/user/password',
      action.payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    yield put(userPasswordChangeSuccess());
  } catch (error: any) {
    yield put(userPasswordChangeFailure(error.message));
  }
}

export function* watchWhoami() {
  yield takeLatest(WHOAMI_REQUEST, whoamiSaga);
}

export function* watchUserUpdate() {
  yield takeLatest(USER_UPDATE_REQUEST, userUpdateSaga);
}

export function* watchUserPasswordChange() {
  yield takeLatest(USER_PASSWORD_CHANGE_REQUEST, userPasswordChangeSaga);
}
