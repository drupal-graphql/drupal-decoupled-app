/**
 * Combine all reducers in this file and export the combined reducers. If we
 * were to do this in store.js, reducers wouldn't be hot reloadable.
 *
 * @flow
 */

import { combineReducers } from 'redux-immutable';
import routeReducer from './route';

/**
 * Creates the main reducer with the asynchronously loaded ones.
 */
export default (asyncReducers: ?Map<string, any>): Object => combineReducers({
  route: routeReducer,
  ...asyncReducers,
});
