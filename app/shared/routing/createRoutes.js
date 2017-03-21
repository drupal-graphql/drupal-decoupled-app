// @flow

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'App';
import Router from 'App/components/Router';

const createRoutes = (
  // store: AmazeeStore<any, any>,
): React.Element<any> => (
  <Route component={App} path="/">
    <IndexRoute component={Router} />
    <Route path="*" component={Router} />
  </Route>
);

export default createRoutes;
