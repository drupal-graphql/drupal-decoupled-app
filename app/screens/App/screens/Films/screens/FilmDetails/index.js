import React from 'react';
import { Link } from 'react-router';
import Relay, { createContainer } from 'react-relay';
import styles from './styles.css';

const FilmDetails = ({ film }) => (
  <div className={styles.Wrapper}>
    <Link to="/films" className={styles.Link}>Close</Link>
    <h2 className={styles.Title}>{film.title}</h2>
    <p className={styles.OpeningCrawl}>{film.openingCrawl}</p>
  </div>
);

export default createContainer(FilmDetails, {
  fragments: {
    film: () => Relay.QL`
      fragment on Film {
        title
        openingCrawl
      }
    `,
  },
});
