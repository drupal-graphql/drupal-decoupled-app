// @flow

import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { basicPageFragment } from 'BasicPage/fragments';
import { articleFragment } from 'Article/fragments';
import BasicPage from 'BasicPage';
import Article from 'Article';
import NotFound from 'NotFound';

type SplatRouterProps = {
  entity: any,
  loading: boolean,
};

const SplatRouter = ({
  entity,
  loading,
}: SplatRouterProps): React.Element<any> | null => {
  if (loading) {
    return null;
  }

  switch (entity && entity.__typename) { // eslint-disable-line no-underscore-dangle
    case 'NodePage':
      return <BasicPage {...entity} />;

    case 'NodeArticle':
      return <Article {...entity} />;

    default:
      return <NotFound />;
  }
};

const query = gql`
  query SplatRouterQuery($path: String!) {
    route(path: $path) {
      entity {
        ...BasicPageFragment
        ...ArticleFragment
      }
    }
  }

  ${basicPageFragment}
  ${articleFragment}
`;

const withQuery = graphql(query, {
  options: (props: any) => ({
    variables: {
      // Default to the front page when no path suffix was given.
      path: props.match.url,
    },
  }),
  props: ({ data: { route, loading } }: any): SplatRouterProps => ({
    entity: route && route.entity,
    loading,
  }),
});

export default withQuery(SplatRouter);
