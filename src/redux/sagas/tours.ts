import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../api/api';
import { FETCH_TOURS_REQUEST } from '../actionTypes';
import { fetchToursSuccess, fetchToursFailure } from '../actions/tour';

function* fetchTours() {
  try {
    const response = yield call(api.get, '/tour');
    yield put(fetchToursSuccess(response.data));
  } catch (error) {
    yield put(fetchToursFailure(error.message));
  }
}

export function* toursSaga() {
  yield takeLatest(FETCH_TOURS_REQUEST, fetchTours);
} 