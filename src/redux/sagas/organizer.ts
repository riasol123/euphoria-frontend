import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchOrganizerSuccess, fetchOrganizerFailure, getOrganizerStatusSuccess, getOrganizerStatusFailure } from '../actions/organizer';
import { GET_ORGANIZER_STATUS_REQUEST, POST_ORGANIZER_REQUEST } from '../actionTypes';
import { getApplicationStatus, postApplication } from '../api/organizer';

function* organizerRequestSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(postApplication, action.payload);
    yield put(fetchOrganizerSuccess(response));
  } catch (error: any) {
    yield put(fetchOrganizerFailure(error.message));
  }
}

function* organizerStatusSaga(): Generator<any, void, any> {
  try {
    const response = yield call(getApplicationStatus);
    yield put(getOrganizerStatusSuccess(response));
  } catch (error: any) {
    yield put(getOrganizerStatusFailure(error.message));
  }
}

export function* watchOrganizer() {
  yield takeLatest(POST_ORGANIZER_REQUEST, organizerRequestSaga);
  yield takeLatest(GET_ORGANIZER_STATUS_REQUEST, organizerStatusSaga);
} 