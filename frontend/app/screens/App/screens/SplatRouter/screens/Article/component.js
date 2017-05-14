// @flow

import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import styled from 'styled-components';
import Title from 'Title';
import Body from 'Body';

type ArticleProps = {
  title: string,
  body: string,
};

const Wrapper = styled.div`
  background-color: Red;
  margin: 1rem 0;
`;

const Article = ({ title, body }: ArticleProps): React.Element<any> => (
  <Wrapper>
    <Helmet title={title} />
    <Title>{title}</Title>
    <Body>{body}</Body>
    <Link to="/articles">Back to overview</Link>
  </Wrapper>
);

export default Article;
