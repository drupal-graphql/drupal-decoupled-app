// @flow

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { AppContainer } from 'react-hot-loader';
import { Preloader } from 'react-router-preload-core';
import App from 'App';

type RootProps = {
  client: any,
};

const Root = ({ client }: RootProps): React.Element<any> =>
  (<AppContainer>
    <BrowserRouter>
      <Preloader>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </Preloader>
    </BrowserRouter>
  </AppContainer>);

export default Root;
