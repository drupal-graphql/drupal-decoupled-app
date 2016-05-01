const babelRelayPlugin = require('babel-relay-plugin');
const introspectionQuery = require('graphql/utilities').introspectionQuery;
const request = require('sync-request');

const api = process.env.GRAPHQL_API;

const response = request('POST', api, {
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: introspectionQuery,
  }),
});

const schema = JSON.parse(response.body.toString('utf-8'));
module.exports = babelRelayPlugin(schema.data);
