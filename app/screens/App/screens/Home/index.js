// @flow

import React from 'react';
import Relay from 'react-relay';
import compose from 'recompose/compose';
import createContainer from 'recompose-relay/createContainer';
import Home from './component';

const relayContainer = createContainer({
  fragments : {
    articleList : () => Relay.QL`
      fragment on Viewer {
        allArticles(first: 1000000) {
          edges {
            node {
              id
              title
              body
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
