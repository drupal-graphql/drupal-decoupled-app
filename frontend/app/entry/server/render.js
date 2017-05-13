// @flow

import React from 'react';
import Helmet from 'react-helmet';
import { match, createMemoryHistory, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
// $FlowIssue: Type definitions are incorrect for this one.
import { ApolloProvider, renderToStringWithData } from 'react-apollo/lib';
import configureApolloClient from 'state/configureApolloClient';
import selectLocationState from 'state/selectors/locationState';
import configureServerStore from 'state/configureServerStore';
import createRoutes from 'routing/createRoutes';
import logger from 'logger';

const renderWithoutSsr = (
  env: Object,
  req: Object,
  res: Object,
  next: Function,
): void => {
  const apiUri: string = JSON.stringify(env.API);
  const apiVersion: string =
    (env.API_VERSION && JSON.stringify(env.API_VERSION)) || '';
  const initialState: string = JSON.stringify({});

  // Let the client render the site (e.g. when debugging).
  res.render('template', {
    apiUri,
    apiVersion,
    initialState,
    renderedContent: '',
    htmlAttributes: '',
    htmlHead: '',
  });

  next();
};

const renderWithSsr = (
  env: Object,
  req: Object,
  res: Object,
  next: Function,
): void => {
  // Configure the apollo client with persisted queries.
  const apolloClient: any = configureApolloClient(env.API, env.API_VERSION);

  // Set the current path (req.path) as initial history entry due to this bug:
  // https://github.com/reactjs/react-router-redux/issues/284#issuecomment-184979791
  const memoryHistory: any = createMemoryHistory(req.path);
  const store: AmazeeStore<any, any> = configureServerStore(
    apolloClient,
    memoryHistory,
    req,
  );
  const routes: any = createRoutes(store);

  // Sync history and store, as the react-router-redux reducer is under the
  // non-default key ("routing"), selectLocationState must be provided for
  // resolving how to retrieve the "route" in the state
  syncHistoryWithStore(memoryHistory, store, { selectLocationState });

  /*
   * From the react-router docs:
   *
   * This function is to be used for server-side rendering. It matches a set of routes to
   * a location, without rendering, and calls a callback(error, redirectLocation, renderProps)
   * when it's done.
   *
   * The function will create a `history` for you, passing additional `options` to create it.
   * These options can include `basename` to control the base name for URLs, as well as the pair
   * of `parseQueryString` and `stringifyQuery` to control query string parsing and serializing.
   * You can also pass in an already instantiated `history` object, which can be constructured
   * however you like.
   *
   * The three arguments to the callback function you pass to `match` are:
   * - error: A javascript Error object if an error occured, `undefined`
   *   otherwise.
   * - redirectLocation: A `Location` object if the route is a redirect,
   *  `undefined` otherwise
   * - renderProps: The props you should pass to the routing context if the
   *   route matched, `undefined` otherwise.
   *
   * If all three parameters are `undefined`, this means that there was no route
   * found matching the given location.
   */
  match(
    {
      routes,
      location: req.originalUrl,
    },
    (error: any, redirectLocation: Object, renderProps: Object): void => {
      if (error) {
        next(error);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        next();
      } else if (renderProps) {
        const Root: React.Element<any> = (
          <ApolloProvider store={store} client={apolloClient}>
            <RouterContext {...renderProps} />
          </ApolloProvider>
        );

        // Start profiling of the react rendering with apollo.
        logger.profile('Rendering with data dependencies');

        renderToStringWithData(Root).then(renderedContent => {
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

          // Render the html as a string and collect side-effects afterwards.
          const apiUri: string = JSON.stringify(env.API);
          const apiVersion: string =
            (env.API_VERSION && JSON.stringify(env.API_VERSION)) || '';
          const helmetOutput: Object = Helmet.renderStatic();
          const htmlAttributes: string = helmetOutput.htmlAttributes.toString();
          const htmlHead: string = headOrder
            .map((key: string): string => helmetOutput[key].toString().trim())
            .join('');

          // Start profiling of the initial state extraction.
          logger.profile('Extracting initial state');

          const initialState: string = JSON.stringify({
            ...store.getState(),
            apollo: apolloClient.getInitialState(),
          });

          // Stop profiling of the initial state extraction.
          logger.profile('Extracting initial state');

          res.render('template', {
            apiUri,
            apiVersion,
            renderedContent,
            initialState,
            htmlHead,
            htmlAttributes,
          });

          res.end();
          next();
        });
      } else {
        res.status(404).send('Page not found');
        next();
      }
    },
  );
};

// Express route for server side rendering.
export default (
  env: Object,
  req: Object,
  res: Object,
  next: Function,
): void => {
  const ssrDisabled = !!(env.SSR_DISABLED && JSON.parse(env.SSR_DISABLED));

  if (ssrDisabled) {
    renderWithoutSsr(env, req, res, next);
  } else {
    renderWithSsr(env, req, res, next);
  }
};
