import { combineReducers } from 'redux';

import postReducer from './postReducer';
import modalReducer from './modalReducer';
import authReducer from './authReducer';
import { searchReducer } from './searchReducer';

const rootReducer = combineReducers({
  posts: postReducer,
  modal: modalReducer,
  auth: authReducer,
  search: searchReducer,
});

export default rootReducer;
