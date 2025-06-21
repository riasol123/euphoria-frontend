import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../api/api';
import { WHOAMI_REQUEST } from '../actionTypes';
import { whoamiSuccess, whoamiFailure } from '../actions/auth';
import { USER_UPDATE_REQUEST, userUpdateSuccess, userUpdateFailure } from '../actions/auth';
import { USER_PASSWORD_CHANGE_REQUEST, userPasswordChangeSuccess, userPasswordChangeFailure } from '../actions/auth';
import { userPasswordChange, userUpdate } from '../api/user';
import { openModal } from '../actions/modal';
import { ModalType } from '../../types/modal/types';

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
    const response = yield call(userUpdate, action.payload);

    yield put(openModal({ title: 'Готово!', description: 'Вашы данные были успешно обновлены.', type: ModalType.success }));
    yield put(userUpdateSuccess(response));
  } catch (error: any) {
    yield put(userUpdateFailure(error.message));
  }
}

function* userPasswordChangeSaga(action: any): Generator<any, void, any> {
  try {
    yield call(userPasswordChange, action.payload);

    yield put(openModal({ title: 'Готово!', description: 'Новый пароль установлен.', type: ModalType.success }));
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
