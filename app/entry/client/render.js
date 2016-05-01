/**
 * Root component for setting up the redux provider and route container.
 *
 * Needs to be in a separate file to enable hot reloading.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import IsomorphicRouter from 'isomorphic-relay-router';
import { match } from 'react-router';
import createRoutes from 'createRoutes';
import Root from './root';

export default (environment, store, history, mountNode) => {
  const routes = createRoutes(store);

  return match({ history, routes }, (error, redirectLocation, renderProps) => {
    const preloadedData = window.__PRELOADED_DATA__; // eslint-disable-line no-underscore-dangle

    IsomorphicRouter.injectPreparedData(environment, renderProps, preloadedData).then((props) => {
      ReactDOM.render(<Root store={store} {...props} />, mountNode);
    });
  });
};
