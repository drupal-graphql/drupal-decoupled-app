// @flow

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import createPersistedBatchLink from 'apollo/createPersistedBatchLink';
import introspectionData from 'introspection.json';

const createApolloLink = (apiUri: string) => {
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
  initialData: Object = {},
) => {
  const apolloLink = createApolloLink(apiUri);

  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: introspectionData,
  });

  const apolloCache = __CLIENT__ ?
    new InMemoryCache({ fragmentMatcher }).restore(initialData) :
    new InMemoryCache({ fragmentMatcher });

  const apolloClient = new ApolloClient({
    link: apolloLink,
    cache: apolloCache,
    ssrMode: __SERVER__,
  });

  return apolloClient;
};
