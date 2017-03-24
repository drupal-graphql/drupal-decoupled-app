// @flow

import React from 'react';
import gql from 'graphql-tag';

export type ArticleTeaserProps = {
  title: string,
};

const ArticleTeaser = ({
  title,
}: ArticleTeaserProps): React.Element<any> => (
  <h2>{title}</h2>
);

ArticleTeaser.fragments = {
  articleTeaserFragment: gql`
    fragment ArticleTeaserFragment on Article {
      title:entityLabel
    }
  `,
};

export default ArticleTeaser;
