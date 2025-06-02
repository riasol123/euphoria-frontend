import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../api/api';
import {
  AUTH_LOGIN_REQUEST,
  AUTH_REGISTER_REQUEST,
} from '../actionTypes';
import {
  authLoginSuccess,
  authLoginFailure,
  authRegisterSuccess,
  authRegisterFailure,
} from '../actions/auth';

function* authLoginSaga(action: any) {
  try {
    const { email, password } = action.payload;
    console.log(email, password, 'email, password');
    const response = yield call(api.post, '/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    yield put(authLoginSuccess(response.data));
  } catch (error: any) {
    yield put(authLoginFailure(error.message));
  }
}

function* authRegisterSaga(action: any) {
  try {
    const { email, password, name, surname } = action.payload;
    const response = yield call(api.post, '/auth/registration', { email, password, name, surname });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    yield put(authRegisterSuccess(response.data));
  } catch (error: any) {
    yield put(authRegisterFailure(error.message));
  }
}

export function* watchAuthLogin() {
  yield takeLatest(AUTH_LOGIN_REQUEST, authLoginSaga);
}

export function* watchAuthRegister() {
  yield takeLatest(AUTH_REGISTER_REQUEST, authRegisterSaga);
}
