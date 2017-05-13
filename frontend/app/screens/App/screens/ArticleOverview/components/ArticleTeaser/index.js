// @flow

import React from 'react';
import { Link } from 'react-router';
import gql from 'graphql-tag';
import styled from 'styled-components';

/* eslint-disable react/no-unused-prop-types */
export type ArticleTeaserProps = {
  title: string,
  url: {
    alias: string,
  },
  body: string,
};
/* eslint-enable react/no-unused-prop-types */

const Wrapper = styled.div`
  border: 1px solid Black;
  padding: 1rem;
  margin: 1rem 0;
`;

const Title = styled.h2`
  font-weight: bold;
  font-size: 16px;
`;

const Body = styled.div`
  font-size: 10px;
`;

const ArticleTeaser = ({ title, url, body }: ArticleTeaserProps): React.Element<any> => (
  <Wrapper>
    <Title>
      <Link to={url && url.alias}>{title}</Link>
    </Title>

    {/* eslint-disable react/no-danger */}
    <Body dangerouslySetInnerHTML={{ __html: body }} />
    {/* eslint-enable react/no-danger */}
  </Wrapper>
);

ArticleTeaser.fragments = {
  articleTeaserFragment: gql`
    fragment ArticleTeaserFragment on NodeArticle {
      url:entityUrl {
        alias
      }

      title
      body
    }
  `,
};

export default ArticleTeaser;
