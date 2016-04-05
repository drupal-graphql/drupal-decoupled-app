/**
 * Root component for setting up the redux provider and route container.
 *
 * Needs to be in a separate file to enable hot reloading.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { match } from 'react-router';
import createRoutes from 'createRoutes';
import Root from './root';

export default (store, history, mountNode) => {
  const routes = createRoutes(store);

  return match({ history, routes }, () => {
    ReactDOM.render(<Root store={store} history={history} routes={routes} />, mountNode);
  });
};
