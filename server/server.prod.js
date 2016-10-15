/**
 * @file    production node express server
 * @author  Sebastian Siemssen <sebastian@amazeelabs.com>
 * @date    2016-01-01
 */


import path from 'path';
import express from 'express';

const buildPath = path.resolve(process.cwd(), 'build');
const render = require(path.join(buildPath, 'render')).default; // eslint-disable-line import/no-dynamic-require

export default (app) => {

  app.set('views', path.join(buildPath, 'views'));
  app.set('view engine', 'ejs');

  app.use(express.static(path.join(buildPath, 'public')));

  // This is where the server-side rendering magic happens.
  app.get('*', render);

};
