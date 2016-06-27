import React from 'react';
import Relay, { createContainer } from 'react-relay';
import Article from 'Article';
import styles from './styles.css';

const Articles = ({ articles }) =>
  <div className={styles.Wrapper}>
    <ul>{articles.edges.map(({ node }) =>
      <li key={node.id}><Article article={node} /></li>
    )}</ul>
  </div>;

export default createContainer(Articles, {
  fragments: {
    articles: () => Relay.QL`
      fragment on ArticlesConnection {
        edges {
          node {
            id
            ${Article.getFragment('article')}
          }
        }
      }
    `,
  },
});
