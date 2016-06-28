/**
 * @file    node express server
 * @author  Sebastian Siemssen <sebastian@amazeelabs.com>
 * @date    2016-01-01
 */

/* eslint-disable global-require */
/* eslint-disable consistent-return */

// Fix error "Warning: Possible EventEmitter memory leak detected.".
require('events').EventEmitter.prototype._maxListeners = 200; // eslint-disable-line no-underscore-dangle

import compression from 'compression';
import express from 'express';
import graphql from 'express-graphql';
import mongoose from 'mongoose';
import schema from './schema';

const app = express();
const port = process.env.PORT || 3000;

app.use(compression());

// Set up the GraphQL Mock API.
app.use('/graphql', graphql({
  schema,
  graphiql: true,
}));

// Add middlewares, etc. for the current environment.
if (process.env.NODE_ENV === 'production') {
  require('./server.prod').default(app);
} else {
  const devOptions = require('../internals/webpack/webpack.dev');
  require('./server.dev').default(app, devOptions);
}

// Start your app.
app.listen(port, () => {
  mongoose.connect('mongodb://localhost/popo');
  console.log(`Server listening at ${port}.`);
});
