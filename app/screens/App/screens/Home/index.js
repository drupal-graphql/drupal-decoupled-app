import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import styles from './styles.css';

const Home = () => (
  <div className={styles.Wrapper}>
    <Link to="/films" className={styles.Link}>List movies</Link>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  changeRoute: (url) => dispatch(push(url)),
});

export default connect(null, mapDispatchToProps)(Home);
