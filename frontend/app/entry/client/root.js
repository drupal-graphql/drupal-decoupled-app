// @flow

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { AppContainer } from 'react-hot-loader';
import { makeAsyncRouter } from 'react-router-preload';
import App from 'App';

type RootProps = {
  client: any,
};

const AsyncRouter = makeAsyncRouter(BrowserRouter);
const Root = ({ client }: RootProps): React$Element<any> =>
  (<AppContainer>
    <AsyncRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </AsyncRouter>
  </AppContainer>);

export default Root;
