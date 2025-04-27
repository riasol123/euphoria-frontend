import { all } from 'redux-saga/effects';

import postSaga from './postSaga';
import authSaga from './authSaga';
import authUserSaga from './authUserSaga';

function* rootSaga() {
  yield all([postSaga(), authSaga(), authUserSaga()]);
}

export default rootSaga;
