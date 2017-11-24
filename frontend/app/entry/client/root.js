// @flow

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { AppContainer } from 'react-hot-loader';
import Preloader from 'Preloader';
import App from 'App';

type RootProps = {
  client: any,
};

const Root = ({ client }: RootProps): React.Element<any> =>
  (<AppContainer>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Preloader context={{ client }}>
          <App />
        </Preloader>
      </ApolloProvider>
    </BrowserRouter>
  </AppContainer>);

export default Root;
