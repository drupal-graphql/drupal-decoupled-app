import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import styles from './styles.css';

const Home = () =>
  <div className={styles.Wrapper}>
    <Helmet title="Home" />
    <Link to="/films" className={styles.Link}>List movies</Link>
  </div>;

export default Home;
