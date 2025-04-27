import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  Store,
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas/rootSaga.ts';
import reducer from './reducers/rootReducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

const store: Store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
