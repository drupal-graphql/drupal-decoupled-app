import React from 'react';
import Helmet from 'react-helmet';
import styles from './styles.css';

const NotFound = () => (
  <div className={styles.Wrapper}>
    <Helmet title="Page not found" />
    <div>Page not found.</div>
  </div>
);

export default NotFound;
