const loader = require('graphql-tag/loader');

const context = {
  cacheable: () => {},
};

// Automatically add the typename property to each query when
// loaded in the test environment.
const search = 'module.exports = doc;';
const replace = 'module.exports = addTypename(doc);';

module.exports = {
  process: src => {
    const code = loader.call(context, src).replace(search, replace);

    return `
      const addTypename = require('apollo-utilities').addTypenameToDocument;
      ${code};
    `;
  },
};
