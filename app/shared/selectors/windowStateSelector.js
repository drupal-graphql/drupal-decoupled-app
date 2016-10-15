/**
 * window state selector
 *
 * @flow
 */
import { Map } from 'immutable';
import type { State } from 'redux';

let prevWindowState: Map<string, any>;
let prevWindowStateJS: Map<string, any>;

export default (state: State): Map<string, any> => {
  const windowState = state.get('window');

  if (!windowState.equals(prevWindowState)) {
    prevWindowState = windowState;
    prevWindowStateJS = windowState.toJS();
  }

  return prevWindowStateJS;
};
