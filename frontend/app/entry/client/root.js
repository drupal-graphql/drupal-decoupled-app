// @flow

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { AppContainer } from 'react-hot-loader';
import { PreloadContainer } from 'react-router-preload';
import App from 'App';

type RootProps = {
  client: any,
};

const Root = ({ client }: RootProps): React$Element<any> =>
  (<AppContainer>
    <BrowserRouter>
      <PreloadContainer>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </PreloadContainer>
    </BrowserRouter>
  </AppContainer>);

export default Root;
