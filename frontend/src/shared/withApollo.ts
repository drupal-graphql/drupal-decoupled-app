import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import withApollo from 'next-with-apollo';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: __INTROSPECTION__,
});

export default withApollo({
  link: {
    http: ({ headers }) =>
      createHttpLink({
        uri: typeof window === 'undefined' ? process.env.API : window.__API__,
        credentials: 'same-origin',
        headers,
      }),
  },
  client: ({ link }) => ({
    link,
    cache: new InMemoryCache({ fragmentMatcher }),
  }),
});
