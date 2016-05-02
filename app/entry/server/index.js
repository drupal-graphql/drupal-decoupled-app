import React from 'react';
import Relay from 'react-relay';
import IsomorphicRouter from 'isomorphic-relay-router';
import { renderToString } from 'react-dom/server';
import { Router, match, createMemoryHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import configureStore from 'configureStore';
import createRoutes from 'createRoutes';
import locationStateSelector from 'selectors/locationStateSelector';

/*
 * Export render function to be used in server/config/routes.js
 * We grab the state passed in from the server and the req object from Express/Koa
 * and pass it into the Router.run function.
 */
export default (req, res, next) => {
  // Get the host and port from the request.
  const protocol = req.protocol;
  const host = req.get('Host');

  // Set up relay.
  const networkLayer = new Relay.DefaultNetworkLayer(`${protocol}://${host}/graphql`);

  // Set the current path (req.path) as initial history entry due to this bug:
  // https://github.com/reactjs/react-router-redux/issues/284#issuecomment-184979791
  const memoryHistory = createMemoryHistory(req.path);
  const store = configureStore({}, memoryHistory);
  const routes = createRoutes(store);

  // Sync history and store, as the react-router-redux reducer is under the
  // non-default key ("routing"), selectLocationState must be provided for
  // resolving how to retrieve the "route" in the state
  syncHistoryWithStore(memoryHistory, store, {
    selectLocationState: locationStateSelector,
  });

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
  match({ routes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (error) {
      next(error);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      IsomorphicRouter.prepareData(renderProps, networkLayer).then(({ data, props }) => {
        const Root = (
          <Provider store={store}>
            <Router {...props} />
          </Provider>
        );

        // The order in which the html head elements should be rendered.
        const headOrder = ['title', 'base', 'meta', 'link', 'script', 'style'];

        // Render the html as a string and collect side-effects afterwards.
        const renderedContent = renderToString(Root);
        const helmetOutput = Helmet.rewind();
        const initialState = JSON.stringify(store.getState());
        const preloadedData = JSON.stringify(data);
        const htmlHead = headOrder.map((key) => helmetOutput[key].toString().trim()).join('');
        const htmlAttributes = helmetOutput.htmlAttributes.toString();

        res.render('index', {
          initialState,
          renderedContent,
          preloadedData,
          htmlHead,
          htmlAttributes,
        });
      }, next);
    } else {
      res.status(404).send('Page not found');
    }
  });
};
