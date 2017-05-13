// @flow

import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import BasicPage from 'BasicPage';
import Article from 'Article';
import NotFound from 'NotFound';

type SplatRouterProps = {
  entity: any,
  loading: boolean,
};

const SplatRouter = ({ entity, loading }: RouterProps): | React.Element<any>
  | null => {
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

  ${BasicPage.fragments.basicPageFragment}
  ${Article.fragments.articleFragment}
`;

const withQuery = graphql(query, {
  options: (props: any) => ({
    variables: {
      // Default to the front page when no path suffix was given.
      path: `/${props.params.splat || ''}`,
    },
  }),
  props: ({ data: { route, loading } }: any): SplatRouterProps => ({
    entity: route && route.entity,
    loading,
  }),
});

export default withQuery(SplatRouter);
