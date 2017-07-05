// @flow

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { AppContainer } from 'react-hot-loader';
import App from 'App';

type RootProps = {
  store: AmazeeStore<any, any>,
  client: any,
};

const Root = ({ store, client }: RootProps): React.Element<any> =>
  (<AppContainer>
    <ApolloProvider client={client} store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </AppContainer>);

export default Root;
