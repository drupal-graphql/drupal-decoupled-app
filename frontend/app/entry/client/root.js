// @flow

import React from 'react';
import { Router } from 'react-router';
import { ApolloProvider } from 'react-apollo';
import { AppContainer } from 'react-hot-loader';

type RootProps = {
  store: AmazeeStore<any, any>,
  routes: React.Element<any>,
  history: any,
  client: any,
};

const Root = ({
  store,
  routes,
  history,
  client,
}: RootProps): React.Element<any> => (
  <AppContainer>
    <ApolloProvider client={client} store={store}>
      <Router history={history}>
        {routes}
      </Router>
    </ApolloProvider>
  </AppContainer>
);

export default Root;
