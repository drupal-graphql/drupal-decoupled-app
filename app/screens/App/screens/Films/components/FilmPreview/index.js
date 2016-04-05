import React from 'react';
import Relay, { createContainer } from 'react-relay';
import { Link } from 'react-router';
import styles from './styles.css';

const FilmPreview = ({ film }) => (
  <div className={styles.Preview}>
    <h2 className={styles.Title}>
      <Link to={`/films/${film.id}`} className={styles.Link} activeClassName={styles.LinkActive}>{film.title}</Link>
    </h2>
    <h3 className={styles.ReleaseDate}>{film.releaseDate}</h3>
    <p className={styles.OpeningCrawl}>{film.openingCrawl.substr(0, 100)} ...</p>
  </div>
);

export default createContainer(FilmPreview, {
  fragments: {
    film: () => Relay.QL`
      fragment on Film {
        id
        title
        releaseDate
        openingCrawl
      }
    `,
  },
});
