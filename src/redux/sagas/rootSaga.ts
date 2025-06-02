import { all } from 'redux-saga/effects';

import { foodCategoriesSaga } from './foodCategories';
import { watchWhoami, watchUserUpdate, watchUserPasswordChange } from './authUserSaga';
import { watchAuthLogin, watchAuthRegister } from './authSaga';
import { toursSaga } from './tours';
import { watchAuthGenerateVerifyCode, watchAuthVerifyEmail } from './verifyEmailSaga';
import { watchOrganizerRequest } from './organizerSaga';

function* rootSaga() {
  yield all([
    watchWhoami(),
    foodCategoriesSaga(),
    watchAuthLogin(),
    watchAuthRegister(),
    toursSaga(),
    watchAuthGenerateVerifyCode(),
    watchAuthVerifyEmail(),
    watchUserUpdate(),
    watchUserPasswordChange(),
    watchOrganizerRequest(),
  ]);
}

export default rootSaga;
