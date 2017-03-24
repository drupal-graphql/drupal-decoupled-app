// @flow

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'App';
import SplatRouter from 'App/screens/SplatRouter';
import ArticleOverview from 'App/screens/ArticleOverview';

const createRoutes = (
  // store: AmazeeStore<any, any>,
): React.Element<any> => (
  <Route component={App} path="/">
    <IndexRoute component={SplatRouter} />
    <Route path="articles" component={ArticleOverview} />
    <Route path="*" component={SplatRouter} />
  </Route>
);

export default createRoutes;
