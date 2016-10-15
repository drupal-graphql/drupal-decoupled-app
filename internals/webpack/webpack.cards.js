/**
 * @file    develop webpack config
 * @author  Sebastian Siemssen <sebastian@amazeelabs.com>
 * @date    2016-01-01
 */

 /* eslint-disable global-require */

// Override the NODE_ENV set by reactcards.
process.env.NODE_ENV = 'development';

// Load the environment configuration.
require('dotenv-extended').config(
  {
    path      : '.env.local',
    defaults  : '.env',
  }
);

const path = require('path');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = (config) => {
  const devConfig = require('./webpack.dev');

  return Object.assign({}, devConfig, {
    entry: config.entry,
    output: config.output,

    // Add hot reloading
    plugins : config.plugins.concat([
      new DashboardPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        __CLIENT__      : true,
        __SERVER__      : false,
        __PRODUCTION__  : false,
        __DEVELOPMENT__ : false,
        __CARDS__       : true,
      }),
    ]),

    module : Object.assign({}, devConfig.module, {
      loaders : [
        {
          test    : /\.js$/, // Transform all .js files required somewhere with Babel.
          loader  : 'babel',
          exclude : /node_modules/,
          query   : {
            presets : ['es2015'],
            plugins : [
              'react-hot-loader/babel',
              path.resolve(process.cwd(), 'internals', 'webpack', 'relay'),
            ],
          },
        },
      ].concat(devConfig.module.loaders),
    }),

    node: {
      fs: 'empty',
    },

    externals: {
      cheerio: 'window',
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true,
    },
  });
};
