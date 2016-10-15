/* eslint-disable global-require */

/**
 * @file    relay webpack config
 * @author  Sebastian Siemssen <sebastian@amazeelabs.com>
 * @date    2016-01-01
 */

require('babel-polyfill');

const path = require('path');
const babelRelayPlugin = require('babel-relay-plugin');
const loopWhile = require('deasync').loopWhile;
const graphql = require('graphql').graphql;
const introspectionQuery = require('graphql/utilities').introspectionQuery;

// Load the schema from the ES6/7 source in development mode. This is normally
// not required but in case of reactcards we have to do this manually.
if (process.env.NODE_ENV === 'development') {
  require('babel-register');
}

// During production, we need to load the schema from the build directory.
const schemaPath = process.env.NODE_ENV === 'development' ?
  path.resolve(process.cwd(), 'server', 'schema') :
  path.resolve(process.cwd(), 'build', 'server', 'schema');
const mockSchema = require(schemaPath).default; // eslint-disable-line import/no-dynamic-require

// For now, we run the introspection query against our mock API.
graphql(mockSchema, introspectionQuery).then((result) => {
  module.exports = babelRelayPlugin(result.data);
});

loopWhile(() => typeof module.exports === 'undefined');
