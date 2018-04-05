const R = require('ramda');
const path = require('path');
const withTypeScript = require('@zeit/next-typescript');
const withResolveAliases = require('./config/next/withResolveAliases');
const withQueryFiles = require('./config/next/withQueryFiles');
const withCssFiles = require('./config/next/withCssFiles');
const withAssetFiles = require('./config/next/withAssetFiles');
const distConfig = require('./next.config.dist');
const webpack = require('webpack');

// Compose our configuration builder functions so we don't end up
// with one gigantic webpack configuration file that no one understands.
const withComposedConfig = R.compose(
  withResolveAliases,
  withQueryFiles,
  withCssFiles,
  withAssetFiles,
  withTypeScript
);

module.exports = withComposedConfig(
  Object.assign({}, distConfig, {
    typescriptLoaderOptions: {
      transpileOnly: false,
    },
    resolveAliases: {
      '~/components': path.resolve(process.cwd(), 'src', 'components'),
      '~/shared': path.resolve(process.cwd(), 'src', 'shared'),
      '~/static': path.resolve(process.cwd(), 'src', 'static'),
      '~/pages': path.resolve(process.cwd(), 'src', 'pages'),
      '~/routes': path.resolve(process.cwd(), 'server', 'routes'),
    },
    webpack: config => {
      // TODO: There should be a better way without having to commit this file.
      config.plugins.push(
        new webpack.DefinePlugin({
          __INTROSPECTION__: JSON.stringify(require('./introspection.json')),
        })
      );

      return config;
    },
  })
);
