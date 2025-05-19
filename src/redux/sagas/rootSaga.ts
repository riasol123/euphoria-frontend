import { all } from 'redux-saga/effects';

import authSaga from './authSaga';
import authUserSaga from './authUserSaga';

function* rootSaga() {
  yield all([authSaga(), authUserSaga()]);
}

export default rootSaga;
