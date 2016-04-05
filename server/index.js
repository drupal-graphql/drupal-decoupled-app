/* eslint consistent-return:0 */

const path = require('path');
const compression = require('compression');
const app = require('express')();
const proxy = require('http-proxy-middleware');
const render = require(path.resolve(process.cwd(), 'build', 'server')).default;

app.set('views', path.resolve(process.cwd(), 'app', 'entry', 'server'));
app.set('view engine', 'ejs');

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

// This is where the magic happens.
app.get('*', render);

// Start your app.
const port = process.env.PORT || 3000;
app.listen(port);
