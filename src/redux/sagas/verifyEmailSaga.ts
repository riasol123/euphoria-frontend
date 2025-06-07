import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../api/api';
import {
  AUTH_GENERATE_VERIFY_CODE_REQUEST,
  AUTH_VERIFY_EMAIL_REQUEST,
} from '../actionTypes';
import {
  authGenerateVerifyCodeSuccess,
  authGenerateVerifyCodeFailure,
  authVerifyEmailSuccess,
  authVerifyEmailFailure,
} from '../actions/auth';

function* authGenerateVerifyCodeSaga(action: any): Generator<any, void, any> {
  try {
    const { email, name } = action.payload;
    const response = yield call(api.post, '/auth/generate-verify-code', { email, name });
    yield put(authGenerateVerifyCodeSuccess(response.data));
  } catch (error: any) {
    yield put(authGenerateVerifyCodeFailure(error.message));
  }
}

function* authVerifyEmailSaga(action: any): Generator<any, void, any> {
  try {
    const { email, code } = action.payload;
    const response = yield call(api.post, '/auth/verify-email', { email, code });
    yield put(authVerifyEmailSuccess(response.data));
  } catch (error: any) {
    yield put(authVerifyEmailFailure(error.message));
  }
}

export function* watchAuthGenerateVerifyCode(): Generator<any, void, any> {
  yield takeLatest(AUTH_GENERATE_VERIFY_CODE_REQUEST, authGenerateVerifyCodeSaga);
}

export function* watchAuthVerifyEmail(): Generator<any, void, any> {
  yield takeLatest(AUTH_VERIFY_EMAIL_REQUEST, authVerifyEmailSaga);
} 