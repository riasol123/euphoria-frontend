import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../api/api';
import { FETCH_ORGANIZER_REQUEST, fetchOrganizerSuccess, fetchOrganizerFailure } from '../actions/organizer';

function* organizerRequestSaga(action: any): Generator<any, void, any> {
  try {
    const token = localStorage.getItem('token');
    const response = yield call(
      api.post,
      '/organizer/request',
      action.payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    yield put(fetchOrganizerSuccess(response.data));
  } catch (error: any) {
    yield put(fetchOrganizerFailure(error.message));
  }
}

export function* watchOrganizerRequest() {
  yield takeLatest(FETCH_ORGANIZER_REQUEST, organizerRequestSaga);
} 