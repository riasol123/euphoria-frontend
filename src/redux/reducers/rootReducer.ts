import { combineReducers } from 'redux';

import authReducer from './authReducer';
import { searchReducer } from './searchReducer';
import { tourReducer } from './tourReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  search: searchReducer,
  tour: tourReducer,
});

export default rootReducer;
