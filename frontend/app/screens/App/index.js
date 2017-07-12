// @flow

import 'App/normalize.css';

import React from 'react';
import Helmet from 'react-helmet';
import { Switch, Route } from 'react-router';
import Home from 'App/screens/Home';
import SplatRouter from 'App/screens/SplatRouter';
import ArticleOverview from 'App/screens/ArticleOverview';
import styles from './styles.css';

const App = (): React.Element<any> =>
  (<div className={styles.Wrapper}>
    <Helmet
      titleTemplate="Decoupled Drupal - %s"
      defaultTitle="Decoupled Drupal"
    />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/articles/:page?/" component={ArticleOverview} />
      <Route exact path="*" component={SplatRouter} />
    </Switch>
  </div>);

export default App;
