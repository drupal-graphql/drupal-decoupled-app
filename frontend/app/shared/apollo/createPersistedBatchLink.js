// @flow

import { BatchHttpLink } from 'apollo-link-batch-http';
import { BatchLink } from 'apollo-link-batch';
import { Observable } from 'apollo-link';
import { createApolloFetch } from 'apollo-fetch';
import { getQueryDocumentKey } from 'persistgraphql/lib/src/common';
import { apiVersion, queryMap } from 'api';

export default (apiUri) => {
  const customFetch = (uri, { body, ...options }) => {
    const delimiter = uri.indexOf('?') === -1 ? '?' : '&';
    const query = JSON.parse(body)
      .map((item, index) => `${index}=${JSON.stringify(item)}`)
      .join('&');

    return fetch(`${uri}${delimiter}${query}`, {
      ...options,
      method: 'GET',
      headers: {
        ...options.headers,
        Accept: 'application/json',
      },
    });
  };

  const apolloFetch = createApolloFetch({
    uri: apiUri,
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
};
