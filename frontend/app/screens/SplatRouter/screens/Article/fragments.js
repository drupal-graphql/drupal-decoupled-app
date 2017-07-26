// @flow

import gql from 'graphql-tag';

export const articleFragment = gql`
  fragment ArticleFragment on NodeArticle {
    title
    body
  }
`;
