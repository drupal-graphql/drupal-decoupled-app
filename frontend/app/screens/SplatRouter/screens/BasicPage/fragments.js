// @flow

import gql from 'graphql-tag';

export const basicPageFragment = gql`
  fragment BasicPageFragment on NodePage {
    title
    body
  }
`;
