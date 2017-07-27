// @flow

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { AppContainer } from 'react-hot-loader';
import Preloader from 'Preloader';
import App from 'App';

type RootProps = {
  store: AmazeeStore<any, any>,
  client: any,
};

const Root = ({ store, client }: RootProps): React.Element<any> =>
  (<AppContainer>
    <BrowserRouter>
      <ApolloProvider client={client} store={store}>
        <Preloader context={{ client }}>
          <App />
        </Preloader>
      </ApolloProvider>
    </BrowserRouter>
  </AppContainer>);

export default Root;
