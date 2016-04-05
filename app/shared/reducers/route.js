import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

/**
 * Route reducer.
 *
 * The reducer merges route location changes into our immutable state.
 */

// Initial routing state
const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

/**
 * Merge route into the global application state.
 */
export default (state = routeInitialState, action) => {
  if (action.type === LOCATION_CHANGE) {
    return state.merge({
      locationBeforeTransitions: action.payload,
    });
  }

  return state;
};
