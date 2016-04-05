const express = require('express');
const options = require('../internals/webpack/webpack.prod');

module.exports = (app) => {
  app.use(options.output.publicPath, express.static(options.output.path));
};
