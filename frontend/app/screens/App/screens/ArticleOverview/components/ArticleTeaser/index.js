// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Body from 'Body';

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
  font-size: 20px;
`;

const ArticleTeaser = ({
  title,
  url,
  body,
}: ArticleTeaserProps): React.Element<any> =>
  (<Wrapper>
    <Title>
      <Link to={url && url.alias}>
        {title}
      </Link>
    </Title>
    <Body>
      {body}
    </Body>
  </Wrapper>);

ArticleTeaser.fragments = {
  articleTeaserFragment: gql`
    fragment ArticleTeaserFragment on NodeArticle {
      url: entityUrl {
        alias
      }
      title
      body
    }
  `,
};

export default ArticleTeaser;
