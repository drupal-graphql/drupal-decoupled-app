// @flow

import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import BasicPage from 'BasicPage';
import Article from 'Article';
import NotFound from 'NotFound';

type SplatRouterProps = {
  object: any,
  loading: boolean,
};

const SplatRouter = ({
  object,
  loading,
}: RouterProps): React.Element<any> | null => {
  if (loading) {
    return null;
  }

  switch (object && object.__typename) { // eslint-disable-line no-underscore-dangle
    case 'BasicPage':
      return <BasicPage {...object} />;

    case 'Article':
      return <Article {...object} />;

    default:
      return <NotFound />;
  }
};

const query = gql`
  query SplatRouterQuery($path: String!) {
    routeByPath(path: $path) {
      object {
        ...BasicPageFragment
        ...ArticleFragment
      }
    }
  }

  ${BasicPage.fragments.basicPageFragment}
  ${Article.fragments.articleFragment}
`;

const withQuery = graphql(query, {
  options: (props: any) => ({
    variables: {
      // Default to the front page when no path suffix was given.
      path: props.params.splat || '',
    },
  }),
  props: ({
    data: {
      routeByPath,
      loading,
    },
  }: any): SplatRouterProps => ({
    object: routeByPath && routeByPath.object,
    loading,
  }),
});

export default withQuery(SplatRouter);
