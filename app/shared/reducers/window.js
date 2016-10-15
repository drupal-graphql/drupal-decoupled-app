/**
 * window reducer
 *
 * @flow
 */
import { fromJS, Map } from 'immutable';
import { RESIZE } from 'actions/window';

// Initial window state
const initialState = fromJS({
  height : null,
  width  : null,
});

/**
 * Merge browser window state into the global application state.
 */
export default (state : Map<string, any> = initialState, action : Object) => {
  switch (action.type) {
    case RESIZE:
      return state.merge({
        width  : action.payload.width,
        height : action.payload.height,
      });

    default:
      return state;
  }
};
