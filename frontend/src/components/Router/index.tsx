import dynamic from 'next/dynamic';
import { SingletonRouter } from 'next/router';
import React, { ComponentType, StatelessComponent } from 'react';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import { IArticleFragment } from '~/components/Article';
import { IPageFragment } from '~/components/Page';
import withApollo from '~/shared/withApollo';
import query from './query.gql';

// tslint:disable-next-line:no-empty-interface
export interface IRouterProps extends IRouterQueryChildProps {}

export const Router: StatelessComponent<IRouterProps> = ({
  entity,
  loading,
}) => {
  if (loading) {
    return null;
  }

  switch (entity && entity.__typename) {
    case 'NodeArticle': {
      // @ts-ignore
      const Article = dynamic(import('~/components/Article'));
      return <Article {...entity} />;
    }

    case 'NodePage': {
      // @ts-ignore
      const Page = dynamic(import('~/components/Page'));
      return <Page {...entity} />;
    }

    default:
      return null;
  }
};

export interface IRouterQueryProps {
  url: SingletonRouter;
}

export interface IRouterQueryData {
  route: {
    __typename: string;
    entity: IPageFragment | IArticleFragment;
  };
}

export interface IRouterQueryVariables {
  path: string;
}

export interface IRouterQueryChildProps extends IRouterQueryProps {
  entity: IPageFragment | IArticleFragment;
  loading: boolean;
}

const withQuery = graphql<
  IRouterQueryProps,
  IRouterQueryData,
  IRouterQueryVariables,
  IRouterQueryChildProps
>(query, {
  options: props => ({
    variables: {
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
