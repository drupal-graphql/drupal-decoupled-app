// @flow

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import createPersistedBatchLink from 'apollo/createPersistedBatchLink';
import introspectionData from 'introspection.json';

const createAuthLink = (loadToken: Function) => {
  return setContext((request, { headers }) => {
    const token = loadToken();

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null,
      },
    };
  });
}

const createHttpLink = (apiUri: string) => {
  if (__DEVELOPMENT__) {
    return new HttpLink({
      // Enable remote xdebug during development.
      uri: `${apiUri}?XDEBUG_SESSION_START=PHPSTORM`,
      headers: {
        Accept: 'application/json',
      },
    });
  }

  return createPersistedBatchLink(apiUri);
}

export default (
  apiUri: string,
  loadToken: Function,
  initialData: Object = {},
) => {
  const apolloLink = createHttpLink(apiUri);
  const authLink = createAuthLink(loadToken);

  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: introspectionData,
  });

  const apolloCache = __CLIENT__ ?
    new InMemoryCache({ fragmentMatcher }).restore(initialData) :
    new InMemoryCache({ fragmentMatcher });

  const apolloClient = new ApolloClient({
    link: authLink.concat(apolloLink),
    cache: apolloCache,
    ssrMode: __SERVER__,
  });

  return apolloClient;
};
