/**
 * Create the store with asynchronously loaded reducers.
 *
 * @flow
 */
import { createStore, applyMiddleware, compose } from 'redux';
import type { Store } from 'redux'; // eslint-disable-line
import { fromJS } from 'immutable';
import createReducer from './reducers';

const devToolsExtension = __CLIENT__ && window.devToolsExtension || (() => (noop) => noop);

// Object to register asynchronously loaded reducers.
const asyncReducers : Object = {};

export default (initialState : Object = {}) => {
  const middlewares = [
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
    devToolsExtension(),
  ];

  // Create the store with the enhancers.
  const store: Store = createStore(
    createReducer(),
    fromJS(initialState),
    compose(...enhancers)
  );

  // Make reducers hot reloadable.
  if (module.hot && module.hot.accept && typeof module.hot.accept === 'function') {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

/**
 * Inject an asynchronously loaded reducer.
 */
export const injectAsyncReducer: Function = (store: Store, name: string, asyncReducer: Object) => {
  asyncReducers[name] = asyncReducer; // eslint-disable-line
  store.replaceReducer(createReducer(asyncReducers));
};
