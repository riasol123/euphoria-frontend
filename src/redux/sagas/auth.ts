import { call, put, takeLatest } from 'redux-saga/effects';
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
import { login, register } from '../api/auth';

function* authLoginSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(login, action.payload);
    console.log(response.token)
    localStorage.setItem('token', response.token);
    yield put(authLoginSuccess(response));
  } catch (error) {
    yield put(authLoginFailure(error instanceof Error ? error.message : 'Unknown error occurred'));
  }
}

function* authRegisterSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(register, action.payload);
    localStorage.setItem('token', response.token);
    yield put(authRegisterSuccess(response));
  } catch (error) {
    yield put(authRegisterFailure(error instanceof Error ? error.message : 'Unknown error occurred'));
  }
}

export function* watchAuthLogin(): Generator<any, void, any> {
  yield takeLatest(AUTH_LOGIN_REQUEST, authLoginSaga);
}

export function* watchAuthRegister(): Generator<any, void, any> {
  yield takeLatest(AUTH_REGISTER_REQUEST, authRegisterSaga);
}
