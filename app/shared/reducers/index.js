/**
 * Combine all reducers in this file and export the combined reducers. If we
 * were to do this in store.js, reducers wouldn't be hot reloadable.
 *
 * @flow
 */
import { combineReducers } from 'redux-immutable';
import windowReducer from './window';

/**
 * Creates the main reducer with the asynchronously loaded ones.
 */
export default (asyncReducers : ?Object) : Object => combineReducers({
  window : windowReducer,
  ...asyncReducers,
});
