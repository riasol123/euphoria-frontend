import { all } from 'redux-saga/effects';

import { watchAuthLogin, watchAuthRegister } from './auth';
import { watchFoodCategories } from './foodCategories';
import { watchAuthGenerateVerifyCode, watchAuthVerifyEmail } from './verify';
import { watchWhoami, watchUserUpdate, watchUserPasswordChange } from './user';
import { toursSaga } from './tours';
import { watchOrganizerRequest } from './organizer';
import { watchCategories } from './categories';

export function* rootSaga() {
  yield all([
    watchAuthLogin(),
    watchAuthRegister(),
    watchFoodCategories(),
    watchAuthGenerateVerifyCode(),
    watchCategories(),
    watchAuthVerifyEmail(),
    watchWhoami(),
    toursSaga(),
    watchUserUpdate(),
    watchUserPasswordChange(),
    watchOrganizerRequest(),
  ]);
}
