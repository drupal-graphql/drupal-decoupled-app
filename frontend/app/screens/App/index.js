// @flow

import 'App/styles';

import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router';
import Home from 'App/screens/Home';
import SplatRouter from 'App/screens/SplatRouter/component';
import ArticleOverview from 'App/screens/ArticleOverview/component';

const Wrapper = styled.div`
  max-width: 90rem;
  margin: auto;
  padding: 1rem;
  background-color: lightgrey;
`;

const App = (): React.Element<any> =>
  (<Wrapper>
    <Helmet
      titleTemplate="Decoupled Drupal - %s"
      defaultTitle="Decoupled Drupal"
    />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/articles/:page?/" component={ArticleOverview} />
      <Route exact path="*" component={SplatRouter} />
    </Switch>
  </Wrapper>);

export default App;
