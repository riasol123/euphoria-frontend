import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../api/api';
import { FETCH_TOURS_REQUEST } from '../actionTypes';
import { CREATE_TOUR_REQUEST } from '../actions/tour';
import { fetchToursSuccess, fetchToursFailure, createTourSuccess, createTourFailure, FETCH_BOOKINGS_REQUEST, fetchBookingsSuccess, fetchBookingsFailure } from '../actions/tour';

function* fetchTours(action: any): Generator<any, void, any> {
  try {
    let url = '/tour';
    const p = action.payload || {};
    const params = new URLSearchParams();
    params.append('page', p.page ?? 1);
    params.append('limit', p.limit ?? 10);
    params.append('title', p.title ?? '');
    params.append('isAccommodation', String(p.isAccommodation ?? false));
    params.append('categoryIds', p.categoryIds ?? '');
    params.append('startDate', p.startDate ?? '');
    params.append('endDate', p.endDate ?? '');
    params.append('city', p.city ?? '');
    params.append('durationFrom', p.durationFrom ?? 1);
    params.append('durationTo', p.durationTo ?? 30);
    url += `?${params.toString()}`;
    const response = yield call(api.get, url);
    yield put(fetchToursSuccess(response.data));
  } catch (error: any) {
    yield put(fetchToursFailure(error.message));
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

export function* toursSaga() {
  yield takeLatest(FETCH_TOURS_REQUEST, fetchTours);
  yield takeLatest(CREATE_TOUR_REQUEST, createTourSaga);
  yield takeLatest(FETCH_BOOKINGS_REQUEST, fetchBookingsSaga);
} 