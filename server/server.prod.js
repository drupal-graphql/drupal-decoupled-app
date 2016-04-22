const path = require('path');
const express = require('express');
const options = require('../internals/webpack/webpack.prod');
const render = require(path.resolve(process.cwd(), 'build', 'server')).default;

module.exports = (app) => {
  app.set('views', path.resolve(process.cwd(), 'build', 'views'));
  app.set('view engine', 'ejs');

  app.use(options.output.publicPath, express.static(options.output.path));

  // This is where the server-side rendering magic happens.
  app.get('*', render);
};
