// @flow

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { BatchLink } from 'apollo-link-batch';
import { Observable } from 'apollo-link';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { createApolloFetch } from 'apollo-fetch';
import { getQueryDocumentKey } from 'persistgraphql/lib/src/common';

const createApolloLink = (
  apiUri: string,
  apiVersion: string,
  queryMap: Object,
) => {
  const requestUri = `${apiUri}?XDEBUG_SESSION_START=PHPSTORM`;

  if (__DEVELOPMENT__) {
    return new HttpLink({
      uri: requestUri,
      headers: {
        Accept: 'application/json',
      },
    });
  }

  const customFetch = (uri, { body, ...options }) => {
    const delimiter = uri.indexOf('?') === -1 ? '?' : '&';
    const query = JSON.parse(body)
      .map((item, index) => `${index}=${JSON.stringify(item)}`)
      .join('&');

    return global.fetch(`${uri}${delimiter}${query}`, {
      ...options,
      method: 'GET',
      headers: {
        ...options.headers,
        Accept: 'application/json',
      },
    });

    return fetch(uri, options);
  };

  const apolloFetch = createApolloFetch({
    uri: requestUri,
    customFetch,
  });

  function batchHandler(operations) {
    return new Observable((observer) => {
      const printedOperations = operations.map(({ query, ...operation }) => {
        const queryKey = getQueryDocumentKey(query);

        if (!queryMap.hasOwnProperty(queryKey)) {
          observer.error(new Error('Could not find query inside query map.'));
        }

        return {
          ...operation,
          version: apiVersion,
          id: queryMap[queryKey],
        };
      });

      apolloFetch(printedOperations)
        .then((data) => {
          observer.next(data);
          observer.complete();
        })
        .catch(observer.error.bind(observer));
    });
  };

  const apolloLink = new BatchHttpLink();
  return Object.assign(apolloLink, {
    batcher: new BatchLink({
      batchInterval: apolloLink.batchInterval,
      batchMax: apolloLink.batchMax,
      batchHandler: batchHandler.bind(apolloLink),
    }),
  });
}

const configureApolloClient = (
  apiUri: string,
  apiVersion: string,
  queryMap: Object,
  introspectionData: Object,
  initialData: Object = {},
) => {  
  const apolloLink = createApolloLink(apiUri, apiVersion, queryMap);

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

export default configureApolloClient;
