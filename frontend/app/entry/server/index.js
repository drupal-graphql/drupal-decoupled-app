// @flow

// Fetch polyfill for node.
import 'fetch-everywhere';

import express from 'express';
import path from 'path';
import compression from 'compression';
import createRender from './render';

// Express middleware for server side rendering.
const createServerSideRenderer = ({ clientStats }: Object) => {
  const render = createRender(clientStats);

  return (
    req: express$Request,
    res: express$Response,
    next: express$NextFunction,
  ): void => {
    // Do not use this middleware for anything that looks like a static file.
    if (req.url.match(/\./)) {
      next();
    } else {
      render(req, res, next); // eslint-disable-line global-require
    }
  };
};

export default (() => {
  // During development, we directly return the server side renderer.
  if (__DEVELOPMENT__) {
    return createServerSideRenderer;
  }

  // In production, however, we want to get a chance to manipulate the
  // express server.
  return (app: express$Application) => {
    const paths: Object = app.get('paths');

    app.use(compression());

    app.use(
      express.static(path.join(paths.appBuild, 'public'), {
        // Cache static files for a year.
        maxAge: 31536000000,
      }),
    );

    return createServerSideRenderer;
  };
})();
