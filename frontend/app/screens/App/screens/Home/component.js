// @flow

import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import Title from 'Title';
import Paragraph from 'Paragraph';

export type HomeProps = {};

const Home = (): React.Element<any> =>
  (<div>
    <Helmet title="Welcome" />
    <Title>Welcome!</Title>
    <Paragraph>
      This is a simple demo application for Decoupled Drupal using React and
      GraphQL.
    </Paragraph>
    <Link to="/articles">Continue to the article overview.</Link>
  </div>);

export default Home;
