// @flow

import React from 'react';
import Helmet from 'react-helmet';
import Article from 'Article';
import type { HomeScreenProps } from './typings';
import styles from './styles.css';

const Home = ({ articles } : HomeScreenProps) => (
  <div className={styles.Home}>
    <Helmet title="Startseite" />
    
    {articles.map(({ node }) => (
      <Article key={node.id} article={node} />
    ))}
  </div>
);

export default Home;
