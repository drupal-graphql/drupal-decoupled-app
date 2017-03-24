// @flow

import React from 'react';
import Helmet from 'react-helmet';
import gql from 'graphql-tag';
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
  articles: Array<ArticleTeaserProps>,
};

const ArticleOverview = ({
  articles,
}: ArticleOverviewProps): React.Element<any> => (
  <div>
    <Helmet title="Article overview" />
    <h1>Article overview</h1>
    <ul>
      {articles.map(renderArticleTeasers)}
    </ul>
  </div>
);

const query = gql`
  query ArticleOverviewQuery($offset: Int, $limit: Int) {
    articles:allArticles(offset: $offset, limit: $limit) {
      id:entityId
      ...ArticleTeaserFragment
    }
  }

  ${ArticleTeaser.fragments.articleTeaserFragment}
`;

const withQuery = graphql(query, {
  options: (props: any) => ({
    variables: {
      offset: props.params.page ? props.params.page * 20 : 0,
      limit: props.params.page ? props.params.page + 1 * 20 : 20,
    },
  }),
  props: ({
    data: {
      articles,
      loading,
    },
  }: any): ArticleOverviewProps => ({
    articles,
    loading,
  }),
});

export default withQuery(ArticleOverview);
