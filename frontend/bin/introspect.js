#!/usr/bin/node

const fs = require('fs');
const path = require('path');
const { createApolloFetch } = require('apollo-fetch');
const env = require('dotenv-extended').load({
  assignToProcessEnv: false,
});

const introspect = uri => {
  const fetch = createApolloFetch({ uri });
  const query = `{
    __schema {
      types {
        kind
        name
        possibleTypes {
          name
        }
      }
    }
  }`;

  return fetch({ query }).then(result => result.data);
};

introspect(env.API).then(introspection => {
  fs.writeFileSync(
    path.resolve(process.cwd(), 'introspection.json'),
    JSON.stringify(introspection)
  );
});
