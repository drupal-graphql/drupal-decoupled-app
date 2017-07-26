// @flow

import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import styles from './styles.css';

const Home = (): React.Element<any> =>
  (<div className={styles.Wrapper}>
    <Helmet title="Welcome" />
    <h1>Welcome!</h1>
    <p>
      This is a simple demo application for Decoupled Drupal using React and
      GraphQL.
    </p>
    <Link to="/articles">Continue to the article overview.</Link>
  </div>);

export default Home;
