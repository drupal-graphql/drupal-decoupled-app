import React, { StatelessComponent } from 'react';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import Article from '@components/Article';
import Page from '@components/Page';
import withApollo from '@shared/withApollo';
import query from './query.gql';

export interface IRouterProps {
  entity: any;
  loading: boolean;
}

export const Router: StatelessComponent<IRouterProps> = ({
  entity,
  loading,
}) => {
  if (loading) {
    return null;
  }

  switch (entity && entity.__typename) {
    case 'NodeArticle':
      return <Article {...entity} />;

    case 'NodePage':
      return <Page {...entity} />;

    default:
      return null;
  }
};

const withQuery = graphql(query, {
  options: (props: any) => ({
    variables: {
      // Default to the front page when no path suffix was given.
      path: props.url.asPath,
    },
  }),
  props: ({ ownProps, data }) => ({
    ...ownProps,
    entity: data.route && data.route.entity,
    loading: data.loading,
  }),
});

export default compose(withApollo, withQuery)(Router);
