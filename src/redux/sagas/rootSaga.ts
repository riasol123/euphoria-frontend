import { all } from 'redux-saga/effects';

import { watchAuthLogin, watchAuthRegister } from './authSaga';
import { watchFoodCategoriesSaga } from './foodCategories';
import { watchAuthGenerateVerifyCode, watchAuthVerifyEmail } from './verifyEmailSaga';
import { watchWhoami, watchUserUpdate, watchUserPasswordChange } from './authUserSaga';
import { toursSaga } from './tours';
import { watchOrganizerRequest } from './organizerSaga';

export function* rootSaga() {
  yield all([
    watchAuthLogin(),
    watchAuthRegister(),
    watchFoodCategoriesSaga(),
    watchAuthGenerateVerifyCode(),
    watchAuthVerifyEmail(),
    watchWhoami(),
    toursSaga(),
    watchUserUpdate(),
    watchUserPasswordChange(),
    watchOrganizerRequest(),
  ]);
}
