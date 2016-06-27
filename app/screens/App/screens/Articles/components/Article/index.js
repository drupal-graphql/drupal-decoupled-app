import React from 'react';
import Relay, { createContainer } from 'react-relay';
import styles from './styles.css';

const Article = ({ article }) =>
  <div className={styles.Wrapper}>
    <h2 className={styles.Title}>{article.title}</h2>
    <p className={styles.Body}>{article.body}</p>
  </div>;

export default createContainer(Article, {
  fragments: {
    article: () => Relay.QL`
      fragment on Article {
        title
        body
      }
    `,
  },
});
