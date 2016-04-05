/**
 * Root component for setting up the redux provider and route container.
 *
 * Needs to be in a separate file to enable hot reloading.
 */

import React from 'react';
import IsomorphicRouter from 'isomorphic-relay-router';
import { Provider } from 'react-redux';

// For some inexplainable reason, this import is required to make hot-reloading
// work. I have no clue why.
import 'createRoutes';

export default ({ store, history, routes }) => (
  <Provider store={store}>
    <IsomorphicRouter.Router routes={routes} history={history} />
  </Provider>
);
