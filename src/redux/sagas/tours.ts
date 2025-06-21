import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../api/api';
import { CREATE_TOUR_REQUEST, FETCH_BOOKINGS_REQUEST, GET_TOUR_REQUEST, GET_TOURS_REQUEST, POST_BOOKINGS_REQUEST } from '../actionTypes';
import {
  getToursSuccess,
  getToursFailure,
  createTourSuccess,
  createTourFailure,
  fetchBookingsSuccess,
  fetchBookingsFailure,
  getTourSuccess,
  getTourFailure,
  postBookingsSuccess,
  postBookingsFailure,
} from '../actions/tour';
import { bookTour, createTour, getTour, getTours } from '../api/tours';
import { openModal } from '../actions/modal';
import { ModalType } from '../../types/modal/types';

function* getTourSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(getTours, action.payload);
    yield put(getToursSuccess(response));
  } catch (error: any) {
    yield put(getToursFailure(error.message));
  }
}

function* getTourByIdSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(getTour, action.payload);
    yield put(getTourSuccess(response));
  } catch (error: any) {
    yield put(getTourFailure(error.message));
  }
}

function* createTourSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(createTour, action.payload)
    yield put(createTourSuccess(response));
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

function* postBookingsSaga(action: any): Generator<any, void, any> {
  try {
    yield call(bookTour, action.payload);
    yield put(postBookingsSuccess());
    yield put(openModal({ title: 'Готово!', description: 'Тур забронирован.', type: ModalType.success }));
  } catch (error: any) {
    yield put(postBookingsFailure(error.message));
  }
}

export function* watchTours() {
  yield takeLatest(GET_TOURS_REQUEST, getTourSaga);
  yield takeLatest(CREATE_TOUR_REQUEST, createTourSaga);
  yield takeLatest(FETCH_BOOKINGS_REQUEST, fetchBookingsSaga);
  yield takeLatest(GET_TOUR_REQUEST, getTourByIdSaga);
  yield takeLatest(POST_BOOKINGS_REQUEST, postBookingsSaga);
} 