/* eslint-disable global-require */
/* eslint-disable consistent-return */

const compression = require('compression');
const app = require('express')();
const proxy = require('http-proxy-middleware');

app.use(compression());

// Set up a proxy for API requests.
const api = process.env.GRAPHQL_API;
app.use(proxy('/graphql', {
  target: api,
  ws: true,
  changeOrigin: true,
  pathRewrite: {
    '^/graphql' : '',
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
