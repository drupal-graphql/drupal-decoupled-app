/* eslint-disable global-require */

/**
 * @file    relay webpack config
 * @author  Sebastian Siemssen <sebastian@amazeelabs.com>
 * @date    2016-01-01
 */

const path = require('path');
const babelRelayPlugin = require('babel-relay-plugin');
const { loopWhile } = require('deasync');
const { graphql } = require('graphql');
const { introspectionQuery } = require('graphql/utilities');

// During production, we need to load the schema from the build directory.
const schemaPath = process.env.NODE_ENV === 'development' ?
  path.resolve(process.cwd(), 'server', 'schema') :
  path.resolve(process.cwd(), 'build', 'server', 'schema');
const mockSchema = require(schemaPath).default;

// For now, we run the introspection query against our mock API.
graphql(mockSchema, introspectionQuery).then(({ data }) => {
  module.exports = babelRelayPlugin(data);
});

loopWhile(() => typeof module.exports === 'undefined');
