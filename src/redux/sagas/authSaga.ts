import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../api/api';
import {
  AUTH_LOGIN_REQUEST,
  AUTH_REGISTER_REQUEST,
  FETCH_AUTH_REQUEST,
} from '../actionTypes';
import {
  authLoginSuccess,
  authLoginFailure,
  authRegisterSuccess,
  authRegisterFailure,
  fetchAuthSuccess,
  fetchAuthFailure,
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

function* fetchAuthSaga(): Generator<any, void, any> {
  try {
    const response = yield call(fetch, '/api/auth');
    const data = yield call([response, 'json']);
    yield put(fetchAuthSuccess(data));
  } catch (error) {
    yield put(fetchAuthFailure(error as Error));
  }
}

export function* watchAuthLogin() {
  yield takeLatest(AUTH_LOGIN_REQUEST, authLoginSaga);
}

export function* watchAuthRegister() {
  yield takeLatest(AUTH_REGISTER_REQUEST, authRegisterSaga);
}

export function* watchAuthSaga(): Generator<any, void, any> {
  yield takeLatest(FETCH_AUTH_REQUEST, fetchAuthSaga);
}
