import React from 'react';
import Relay, { createContainer } from 'react-relay';
import FilmPreview from 'FilmPreview';
import styles from './styles.css';

const Films = ({ list, children }) =>
  <div className={styles.Wrapper}>
    <ul>{list.edges.map(({ node }) =>
      <li key={node.id}><FilmPreview film={node} /></li>
    )}</ul>
    <div>{children}</div>
  </div>;

export default createContainer(Films, {
  fragments: {
    list: () => Relay.QL`
      fragment on FilmsConnection {
        edges {
          node {
            id
            ${FilmPreview.getFragment('film')}
          }
        }
      }
    `,
  },
});
