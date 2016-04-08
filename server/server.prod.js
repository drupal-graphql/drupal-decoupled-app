const express = require('express');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const options = require('../internals/webpack/webpack.prod');
const render = require(path.resolve(process.cwd(), 'build', 'server')).default;

module.exports = (app) => {
  app.use(options.output.publicPath, express.static(options.output.path));

  const templatePath = path.join(options.output.path, '..', 'views', 'index.ejs');
  const templateString = fs.readFileSync(templatePath).toString();
  const template = ejs.compile(templateString, {
    rmWhitespace: true,
  });

  // This is where the magic happens.
  app.get('*', (req, res, next) => render(req, res, next, template));
};
