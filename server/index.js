/* eslint consistent-return:0 */

const compression = require('compression');
const app = require('express')();
const proxy = require('http-proxy-middleware');

app.use(compression());

// Set up a proxy for API requests.
const api = 'http://graphql-swapi.parseapp.com';
app.use(proxy('/api', {
  target: api,
  ws: true,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/',
  },
}));

// Add middlewares, etc. for the current environment.
if (process.env.NODE_ENV === 'production') {
  require('./server.prod')(app);
} else {
  require('./server.dev')(app);
}

// Start your app.
const port = process.env.PORT || 3000;
app.listen(port);
