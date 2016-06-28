/**
 * @file    production node express server
 * @author  Sebastian Siemssen <sebastian@amazeelabs.com>
 * @date    2016-01-01
 */

import path from 'path';
import express from 'express';

export default (app) => {
  const buildPath = path.resolve(process.cwd(), 'build');
  const rendererPath = path.join(buildPath, 'render');
  const renderer = require(rendererPath).default; // eslint-disable-line global-require

  app.set('views', path.join(buildPath, 'views'));
  app.set('view engine', 'ejs');

  app.use(express.static(path.join(buildPath, 'public')));

  // This is where the server-side rendering magic happens.
  app.get('*', renderer);
};
