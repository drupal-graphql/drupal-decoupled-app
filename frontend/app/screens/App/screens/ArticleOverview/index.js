// @flow

import React from 'react';
import Helmet from 'react-helmet';
import gql from 'graphql-tag';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';
import { filter } from 'graphql-anywhere';
import ArticleTeaser from 'ArticleTeaser';
import type { ArticleTeaserProps } from 'ArticleTeaser';

const renderArticleTeasers = (
  props: ArticleTeaserProps,
): React.Element<any> => (
  <ArticleTeaser
    key={props.id}
    {...filter(ArticleTeaser.fragments.articleTeaserFragment, props)}
  />
);

type ArticleOverviewProps = {
  loading: boolean,
  page: number,
  count: number,
  articles: Array<ArticleTeaserProps>,
};

const pageSize = 5;
const hasPreviousPage = page => page > 0;
const hasNextPage = (page, count) => page + 1 < count / pageSize;
const previousPagePath = page =>
  (page - 1 > 0 ? `/articles/${page - 1}` : '/articles');
const nextPagePath = page => `/articles/${page + 1}`;

const ArticleOverview = ({
  loading,
  page,
  count,
  articles,
}: ArticleOverviewProps): React.Element<any> =>
  !loading &&
  <div>
    <Helmet title="Article overview" />
    <h1>Article overview</h1>
    <ul>
      {articles.map(renderArticleTeasers)}
    </ul>
    <div>
      {hasPreviousPage(page) &&
        <Link to={previousPagePath(page)}>Previous</Link>}
      {hasNextPage(page, count) && <Link to={nextPagePath(page)}>Next</Link>}
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
  options: ({ params: { page = 0 } }) => ({
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

export default withQuery(ArticleOverview);
