import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../api/api';
import { CREATE_TOUR_REQUEST, FETCH_BOOKINGS_REQUEST, GET_TOURS_REQUEST } from '../actionTypes';
import {
  getToursSuccess,
  getToursFailure,
  createTourSuccess,
  createTourFailure,
  fetchBookingsSuccess,
  fetchBookingsFailure,
} from '../actions/tour';
import { getTours } from '../api/tours';

function* getTourSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(getTours, action.payload);
    yield put(getToursSuccess(response.data));
  } catch (error: any) {
    yield put(getToursFailure(error.message));
  }
}

function* createTourSaga(action: any): Generator<any, void, any> {
  try {
    const token = localStorage.getItem('token');
    const response = yield call(
      api.post,
      '/tour',
      action.payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    yield put(createTourSuccess(response.data));
  } catch (error: any) {
    yield put(createTourFailure((error as any).message));
  }
}

function* fetchBookingsSaga(): Generator<any, void, any> {
  try {
    const response = yield call(api.get, '/bookings');
    yield put(fetchBookingsSuccess(response.data));
  } catch (error: any) {
    yield put(fetchBookingsFailure(error.message));
  }
}

export function* watchTours() {
  yield takeLatest(GET_TOURS_REQUEST, getTourSaga);
  yield takeLatest(CREATE_TOUR_REQUEST, createTourSaga);
  yield takeLatest(FETCH_BOOKINGS_REQUEST, fetchBookingsSaga);
} 