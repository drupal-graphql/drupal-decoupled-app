const babelRelayPlugin = require('babel-relay-plugin');
const introspectionQuery = require('graphql/utilities').introspectionQuery;
const request = require('sync-request');

try {
  const api = 'https://graphql-swapi.parseapp.com';
  const response = request('POST', api, {
    qs: {
      query: introspectionQuery,
    },
  });

  const schema = JSON.parse(response.body.toString('utf-8'));

  module.exports = babelRelayPlugin(schema.data);
} catch (error) {
  // Mute any errors to not fail the entire build in case there is no internet
  // connection to fetch the schema.
  module.exports = {};
}
