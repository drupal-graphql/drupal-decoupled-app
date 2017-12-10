// @flow

import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import { StaticRouter } from 'react-router';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import { ApolloProvider } from 'react-apollo';
import serialize from 'serialize-javascript';
import configureApolloClient from 'apollo/configureApolloClient';
import { preloadTree, preloadTreeApollo } from 'react-router-preload';
import logger from 'logger';
import App from 'App';

const doRender = (
  clientStats: Object,
  apolloClient: Object,
) => (req: express$Request, res: express$Response) => (
  renderedContent: string,
) => {
  const env: Object = req.app.get('env');
  const paths: Object = req.app.get('paths');
  const apiUri = JSON.stringify(env.API);

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
  const helmetOutput: Object = Helmet.renderStatic();
  const htmlAttributes: string = helmetOutput.htmlAttributes.toString();
  const htmlHead: string = headOrder
    .map((key: string): string => helmetOutput[key].toString().trim())
    .join('');

  const initialData: string = serialize(apolloClient.cache.extract());

  const { js, styles, cssHash } = flushChunks(clientStats, {
    chunkNames: flushChunkNames(),
    before: ['bootstrap'],
    after: ['main'],
    outputPath: paths.appBuild,
  });

  res.send(`<!doctype html>
<html ${htmlAttributes}>
  <head>
    ${htmlHead}
    ${styles}
  </head>
  <body>
    <div id="app">${renderedContent}</div>
    <script type="text/javascript">window.__DATA__ = ${initialData};</script>
    <script type="text/javascript">window.__API__ = ${apiUri};</script>
    ${cssHash}
    ${js}
  </body>
</html>
  `);

  // Stop profiling of the react rendering with apollo.
  logger.profile('Rendering with data dependencies');
};

type SsrError = Error & {
  queryErrors?: Array<Error>,
};

const extractErrorMessages = (error: SsrError): Array<string> => {
  console.log(error);
  const errors = (error.queryErrors || [])
    .reduce((carry, current) => [...carry, current.toString()], [
      error.toString(),
    ]);

  return errors;
};

const doRenderError = (clientStats: Object) => (
  req: express$Request,
  res: express$Response,
) => (error: Error): void => {
  const env: Object = req.app.get('env');
  const paths: Object = req.app.get('paths');
  const apiUri = JSON.stringify(env.API);

  const { js } = flushChunks(clientStats, {
    chunkNames: flushChunkNames(),
    before: ['bootstrap'],
    after: ['main'],
    outputPath: paths.appBuild,
  });

  const messages = extractErrorMessages(error);

  res.status(505).send(`<!doctype html>
<html>
  <head>
    <title>Error</title>
    <style>
      #error {
        position: fixed;
        top: 10px;
        left: 10px;
        right: 10px;
        bottom: 10px;
        font-family: Arial, Helvetica, sans-serif; 
        font-size: 13px;
        border: 1px solid;
        padding: 15px 10px;
        color: #D8000C;
        background-color: #FFBABA;
        overflow: auto;
      }

      #error h2 {
        font-size: 13px;
        padding: 0;
        margin: 0;
      }

      #error ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }

      #error li {
        margin: 10px 0;
      }
    </style>
  </head>
  <body>
    <div id="error">
      <h2>Server side rendering failed</h2>
      <ul><li>${messages.join('</li><li>')}</li></code>
    </div>
    <div id="app"></div>
    <script>window.__API__ = ${apiUri};</script>
    ${js}
  </body>
</html>`);
};

export default (clientStats: Object) => (
  req: express$Request,
  res: express$Response,
): void => {
  const env: Object = req.app.get('env');
  const apiUri = env.API;

  // Configure the apollo client.
  const apolloClient = configureApolloClient(apiUri);

  const Root: React.Element<any> = (
    <StaticRouter location={req.url} context={{}}>
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </StaticRouter>
  );

  // Start profiling of the react rendering with apollo.
  logger.profile('Rendering with data dependencies');

  // Render the app after loading the graphql data.
  const doRenderFinal = doRender(clientStats, apolloClient);

  // Renders the app component tree into a string.
  const doRenderErrorFinal = doRenderError(clientStats);

  preloadTree(Root, {}, true, [preloadTreeApollo])
    .then(() => renderToString(Root))
    .then(doRenderFinal(req, res))
    .catch(doRenderErrorFinal(req, res));
};
