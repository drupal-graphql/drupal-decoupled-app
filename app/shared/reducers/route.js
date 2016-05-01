/**
 * route reducer
 *
 * @flow
 */
import { fromJS, Map } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

/**
 * Route reducer.
 *
 * The reducer merges route location changes into our immutable state.
 */

// Initial routing state
const routeInitialState: Map<string, any> = fromJS({
  locationBeforeTransitions: null,
});

/**
 * Merge route into the global application state.
 */

// flow-ignore-next-line (eslint & jscs bug)
export default (state = routeInitialState, action: Object) => {
  if (action.type === LOCATION_CHANGE) {
    return state.merge({
      locationBeforeTransitions: action.payload,
    });
  }

  return state;
};
