/**
 * Create the store with asynchronously loaded reducers.
 *
 * @flow
 */
import { createStore, applyMiddleware, compose } from 'redux';
import type { Store } from 'redux-store'; // eslint-disable-line import/no-unresolved
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import sagaMiddleware from 'redux-saga';
import sagas from './sagas';
import createReducer from './reducers';

export default (initialState : Object = {}, history : Object = {}) => {
  // Create the store with two middlewares:
  // 1. sagaMiddleware: Imports all the asynchronous flows ("sagas") from the
  //    sagas folder and triggers them.
  // 2. routerMiddleware: Syncs the location/URL path to the state.
  const createStoreWithMiddleware: Function = compose(
    applyMiddleware(routerMiddleware(history), sagaMiddleware(...sagas)),
    __CLIENT__ && window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  const store: Store = createStoreWithMiddleware(createReducer(), fromJS(initialState));

  // Make reducers hot reloadable, see http://mxs.is/googmo.
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }

  // Initialize it with no other reducers.
  store.asyncReducers = {};

  return store;
};

/**
 * Inject an asynchronously loaded reducer.
 */
export const injectAsyncReducer: Function = (store: Store, name: string, asyncReducer: Object) => {
  store.asyncReducers[name] = asyncReducer; // eslint-disable-line
  store.replaceReducer(createReducer(store.asyncReducers));
};
