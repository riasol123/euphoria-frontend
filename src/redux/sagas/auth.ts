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
import { setToken } from '../../utils/token';
import { openModal } from '../actions/modal';
import { ModalType } from '../../types/modal/types';

function* authLoginSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(login, action.payload);
    setToken(response.token);

    yield put(openModal({ title: 'Готово!', description: 'Вход успешно выполнен.', type: ModalType.success }));
    yield put(authLoginSuccess(response));
  } catch (error) {
    yield put(openModal({ title: 'Ошибка!', description: 'Неверно указана почта или пароль.', type: ModalType.error }));
    yield put(authLoginFailure(error instanceof Error ? error.message : 'Unknown error occurred'));
  }
}

function* authRegisterSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(register, action.payload);
    setToken(response.token);

    yield put(openModal({ title: 'Готово!', description: 'Аккаунт успешно создан.', type: ModalType.success }));
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
