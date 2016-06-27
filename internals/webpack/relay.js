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
const schemaPath = path.resolve(process.cwd(), 'server', 'schema');
const mockSchema = require(schemaPath).default;

// For now, we run the introspection query against our mock API.
let jsonSchema;

let wait = true;
graphql(mockSchema, introspectionQuery).then(({ data }) => {
  jsonSchema = data;
  wait = false;
});

loopWhile(() => wait);

module.exports = babelRelayPlugin(jsonSchema);
