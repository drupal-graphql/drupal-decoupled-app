// @flow

import React from 'react';
import Helmet from 'react-helmet';
import compose from 'recompose/compose';
import defaultProps from 'recompose/defaultProps';
import withPropsOnChange from 'recompose/withPropsOnChange';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { filter } from 'graphql-anywhere';
import ArticleTeaser from 'ArticleTeaser';
import type { ArticleTeaserProps } from 'ArticleTeaser';
import styles from './styles.css';

type ArticleOverviewItem = ArticleTeaserProps & {
  id: number,
};

type ArticleOverviewProps = {
  loading: boolean,
  page: number,
  count: number,
  articles: Array<ArticleOverviewItem>,
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
}: ArticleOverviewProps): React.Element<any> | null =>
  (!loading &&
    <div className={styles.Wrapper}>
      <Helmet title="Article overview" />
      <h1>Article overview</h1>
      <ul>
        {articles.map(article =>
          (<ArticleTeaser
            key={article.id}
            {...filter(ArticleTeaser.fragments.articleTeaserFragment, article)}
          />),
        )}
      </ul>
      <div>
        {hasPreviousPage && <Link to={previousPagePath}>Previous</Link>}
        {hasNextPage && <Link to={nextPagePath}>Next</Link>}
      </div>
    </div>) ||
  null;

const query = gql`
  query ArticleOverviewQuery($offset: Int, $limit: Int) {
    nodeQuery(offset: $offset, limit: $limit, filter: {type: "article" }) {
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
  options: ({ pageSize, match: { params: { page = 0 } } }) => ({
    variables: {
      offset: page * pageSize,
      limit: pageSize,
    },
  }),
  props: ({
    ownProps: { match: { params: { page = 0 } } },
    data: { nodeQuery: { entities, count } = {}, loading },
  }) => ({
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
    previousPagePath:
      props.page - 1 > 0 ? `/articles/${props.page - 1}` : '/articles',
    nextPagePath: `/articles/${props.page + 1}`,
  }),
);

export default compose(withDefaultProps, withQuery, withPagination)(
  ArticleOverview,
);
