let prevRoutingState;
let prevRoutingStateJS;

export default (state) => {
  const routingState = state.get('route');

  if (!routingState.equals(prevRoutingState)) {
    prevRoutingState = routingState;
    prevRoutingStateJS = routingState.toJS();
  }

  return prevRoutingStateJS;
};
