/**
 * location state selector
 *
 * @flow
 */
import { Map } from 'immutable';
import type { State } from 'redux';

let prevRoutingState: Map<string, any>;
let prevRoutingStateJS: Map<string, any>;

export default (state: State): Map<string, any> => {
  const routingState = state.get('route');

  if (!routingState.equals(prevRoutingState)) {
    prevRoutingState = routingState;
    prevRoutingStateJS = routingState.toJS();
  }

  return prevRoutingStateJS;
};
