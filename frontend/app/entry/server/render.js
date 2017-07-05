// @flow

import React from 'react';
import Helmet from 'react-helmet';
import { StaticRouter } from 'react-router';
import { ServerStyleSheet } from 'styled-components';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import serialize from 'serialize-javascript';
import configureApolloClient from 'state/configureApolloClient';
import configureServerStore from 'state/configureServerStore';
import { apiVersion, queryMap } from 'api';
import introspectionData from 'introspection.json';
import logger from 'logger';
import App from 'App';

const doRender = (
  clientStats: Object,
  reduxStore: Object,
  apolloClient: Object,
  styleSheet: Object,
) => (req: Object, res: Object): void => (renderedContent: string) => {
  const apiUri = JSON.stringify(req.app.get('env').API);

  // Stop profiling of the react rendering with apollo.
  logger.profile('Rendering with data dependencies');

  // The order in which the html head elements should be rendered.
  const headOrder: Array<string> = [
    'title',
    'base',
    'meta',
    'link',
    'script',
    'style',
  ];

  // Collect side-effects after rendering the app as a string.
  const styles: string = styleSheet
    .getStyleTags()
    .replace(/(?:\r\n|\r|\n)/g, '');
  const helmetOutput: Object = Helmet.renderStatic();
  const attributes: string = helmetOutput.htmlAttributes.toString();
  const head: string = headOrder
    .map((key: string): string => helmetOutput[key].toString().trim())
    .join('');

  // Start profiling of the initial state extraction.
  logger.profile('Extracting initial state');

  const initialState: string = serialize({
    ...reduxStore.getState(),
    apollo: apolloClient.getInitialState(),
  });

  // Stop profiling of the initial state extraction.
  logger.profile('Extracting initial state');

  const { js } = flushChunks(clientStats, {
    chunkNames: flushChunkNames(),
    before: ['bootstrap'],
    after: ['main'],
    outputPath: req.app.get('paths').appBuild,
  });

  res.send(`<!doctype html>
<html ${attributes}>
  <head>
    ${head}
    ${styles}
  </head>
  <body>
    <div id="app">${renderedContent}</div>
    <script>window.__INITIAL_STATE__ = ${initialState};</script>
    <script>window.__API__ = ${apiUri};</script>
    ${js}
  </body>
</html>
  `);
};

export default (clientStats: Object) => (
  req: Object,
  res: Object,
  next: Function,
): void => {
  const apiUri = req.app.get('env').API;

  // Configure the apollo client with persisted queries.
  const apolloClient = configureApolloClient(
    apiUri,
    apiVersion,
    queryMap,
    introspectionData,
  );

  const reduxStore: AmazeeStore<any, any> = configureServerStore(apolloClient);
  const styleSheet = new ServerStyleSheet();

  const Root: React.Element<any> = styleSheet.collectStyles(
    <ApolloProvider store={reduxStore} client={apolloClient}>
      <StaticRouter location={req.url} context={{}}>
        <App />
      </StaticRouter>
    </ApolloProvider>,
  );

  // Start profiling of the react rendering with apollo.
  logger.profile('Rendering with data dependencies');

  // Render the app after loading the graphql data.
  const doRenderFinal = doRender(
    clientStats,
    reduxStore,
    apolloClient,
    styleSheet,
  );

  renderToStringWithData(Root).then(doRenderFinal(req, res, next));
};
