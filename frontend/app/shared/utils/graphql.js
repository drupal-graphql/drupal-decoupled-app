// @flow

import { graphql } from 'react-apollo';
import { withPreloading } from 'react-preload-core';
import compose from 'recompose/compose';

export default (...args: Array<any>) => {
  const withPreloadedQuery = withPreloading((element, instance) => {    // Check if the current component is an Apollo query wrapper.
    if (instance && typeof instance.fetchData === 'function') {
      // Execute the graphql query for this component.
      const fetch = instance.fetchData();
  
      if (fetch && fetch.then && typeof fetch.then === 'function') {
        return fetch;
      }
    }
  
    return true;
  });

  return compose(withPreloadedQuery, graphql(...args));
};
