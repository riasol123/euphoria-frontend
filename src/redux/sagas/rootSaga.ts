import { all } from 'redux-saga/effects';

import authSaga from './authSaga';
import authUserSaga from './authUserSaga';
import { foodCategoriesSaga } from './foodCategories';

function* rootSaga() {
  yield all([authSaga(), authUserSaga(), foodCategoriesSaga()]);
}

export default rootSaga;
