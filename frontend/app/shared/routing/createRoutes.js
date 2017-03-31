// @flow

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'App';
import SplatRouter from 'App/screens/SplatRouter';
import ArticleOverview from 'App/screens/ArticleOverview';

const createRoutes = (): React.Element<any> => (
  <Route component={App} path="/">
    <IndexRoute component={SplatRouter} />
    <Route path="articles" component={ArticleOverview}>
      <Route path=":page" component={ArticleOverview} />
    </Route>
    <Route path="*" component={SplatRouter} />
  </Route>
);

export default createRoutes;
