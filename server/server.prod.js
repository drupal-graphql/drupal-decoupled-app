const path = require('path');
const buildPath = path.resolve(process.cwd(), 'build');
const express = require('express');
const render = require(buildPath + '/server').default;

module.exports = (app) => {
  app.set('views', buildPath + '/views');
  app.set('view engine', 'ejs');

  app.use('/', express.static(buildPath + '/public'));

  // This is where the server-side rendering magic happens.
  app.get('*', render);
};
