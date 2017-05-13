// @flow

import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import styled from 'styled-components';

const Title = styled.h1`
  font-weight: bold;
  font-size: 24px;
`;

const Paragraph = styled.div`
  font-size: 16px;
`;

const Home = (): React.Element<any> => (
  <div>
    <Helmet title="Welcome" />
    <Title>Welcome!</Title>
    <Paragraph>
      This is a simple demo application for Decoupled Drupal using
      React and GraphQL.
    </Paragraph>
    <Link to="/articles">Continue to the article overview.</Link>
  </div>
);

export default Home;
