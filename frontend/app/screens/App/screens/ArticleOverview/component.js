// @flow

import React from 'react';
import Helmet from 'react-helmet';
import compose from 'recompose/compose';
import defaultProps from 'recompose/defaultProps';
import withPropsOnChange from 'recompose/withPropsOnChange';
import gql from 'graphql-tag';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';
import { filter } from 'graphql-anywhere';
import ArticleTeaser from 'ArticleTeaser';
import Title from 'Title';
import type { ArticleTeaserProps } from 'ArticleTeaser';

type ArticleOverviewProps = {
  loading: boolean,
  page: number,
  count: number,
  articles: Array<ArticleTeaserProps>,
  pageSize: number,
  hasPreviousPage?: boolean,
  hasNextPage?: boolean,
  previousPagePath?: string,
  nextPagePath?: string,
};

const ArticleOverview = ({
  loading,
  articles,
  hasPreviousPage,
  hasNextPage,
  previousPagePath,
  nextPagePath,
}: ArticleOverviewProps): React.Element<any> =>
  !loading &&
  <div>
    <Helmet title="Article overview" />
    <Title>Article overview</Title>
    <ul>
      {articles.map(article => (
        <ArticleTeaser
          key={article.id}
          {...filter(ArticleTeaser.fragments.articleTeaserFragment, article)}
        />
      ))}
    </ul>
    <div>
      {hasPreviousPage && <Link to={previousPagePath}>Previous</Link>}
      {hasNextPage && <Link to={nextPagePath}>Next</Link>}
    </div>
  </div>;

const query = gql`
  query ArticleOverviewQuery($offset: Int, $limit: Int) {
    nodeQuery(offset: $offset, limit: $limit, type: "article") {
      count,
      entities {
        id:entityId
        ...ArticleTeaserFragment
      }
    }
  }

  ${ArticleTeaser.fragments.articleTeaserFragment}
`;

const withQuery = graphql(query, {
  options: ({ pageSize, params: { page = 0 } }) => ({
    variables: {
      offset: page * pageSize,
      limit: pageSize,
    },
  }),
  props: ({
    ownProps: { params: { page = 0 } },
    data: { nodeQuery: { entities, count } = {}, loading },
  }: any): ArticleOverviewProps => ({
    loading,
    page: parseInt(page, 10),
    count,
    articles: entities,
  }),
});

const withDefaultProps = defaultProps({
  pageSize: 5,
});

const withPagination = withPropsOnChange(
  ['count', 'page'],
  (props: ArticleOverviewProps) => ({
    hasPreviousPage: props.page > 0,
    hasNextPage: props.page + 1 < props.count / props.pageSize,
    previousPagePath: props.page - 1 > 0
      ? `/articles/${props.page - 1}`
      : '/articles',
    nextPagePath: `/articles/${props.page + 1}`,
  }),
);

export default compose(withDefaultProps, withQuery, withPagination)(
  ArticleOverview,
);
