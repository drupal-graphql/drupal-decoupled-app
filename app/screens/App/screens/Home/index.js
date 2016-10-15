// @flow

import React from 'react';
import Relay from 'react-relay';
import compose from 'recompose/compose';
import createContainer from 'recompose-relay/createContainer';
import Article from 'Article';
import Home from './component';

const relayContainer = createContainer({
  fragments : {
    articleList : () => Relay.QL`
      fragment on Viewer {
        allArticles(first: 10) {
          edges {
            node {
              id
              ${Article.getFragment('article')}
            }
          }
        }
      }
    `,
  },
});

export default compose(
  relayContainer,
)(({ articleList }) => (
  <Home articles={articleList.allArticles.edges} />
));
