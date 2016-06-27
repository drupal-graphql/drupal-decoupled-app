/**
 * @file    test webpack config
 * @author  Sebastian Siemssen <sebastian@amazeelabs.com>
 * @date    2016-01-01
 */

const path = require('path');
const webpack = require('webpack');
const modules = [
  'screens',
  'components',
  'shared',
  'node_modules',
];

module.exports = {
  context: path.resolve(process.cwd(), 'app'),
  devtool: 'inline-source-map',
  isparta: {
    babel: {
      presets: ['es2015', 'react', 'stage-0'],
    },
  },
  module: {
    // Some libraries don't like being run through babel. If they gripe, put
    // them here.
    noParse: [
      /node_modules(\\|\/)sinon/,
      /node_modules(\\|\/)acorn/,
    ],
    preLoaders: [{
      test: /\.js$/,
      loader: 'isparta',
      include: path.resolve('app/'),
    }],
    loaders: [{
      test: /\.json$/,
      loader: 'json-loader',
    }, {
      // Transform our own .css files with PostCSS and CSS-modules.
      test: /\.css$/,
      exclude: /node_modules/,
      loader: 'style-loader!css-loader?localIdentName=[local]__[path][name]__[hash:base64:5]&modules&importLoaders=1&sourceMap!postcss-loader',
    }, {
      // Do not transform vendor's CSS with CSS-modules. The point is that they
      // remain in global scope. Since we require these CSS files in our JS or
      // CSS files, they will be a part of our compilation either way. So, no
      // need for ExtractTextPlugin here.
      test: /\.css$/,
      include: /node_modules/,
      loaders: ['style-loader', 'css-loader'],
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&mimetype=application/font-woff',
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader',
    }, {
      // sinon.js--aliased for enzyme--expects/requires global vars.
      // imports-loader allows for global vars to be injected into the module.
      // See https://github.com/webpack/webpack/issues/304
      test: /sinon(\\|\/)pkg(\\|\/)sinon\.js/,
      loader: 'imports?define=>false,require=>false',
    }, {
      test: /\.js$/,
      loader: 'babel',
      exclude: [/node_modules/],
    }, {
      test: /\.jpe?g$|\.gif$|\.png$/i,
      loader: 'null-loader',
    }],
  },

  // Some node_modules pull in Node-specific dependencies. Since we're running
  // in a browser we have to stub them out. See:
  // https://webpack.github.io/docs/configuration.html#node
  // https://github.com/webpack/node-libs-browser/tree/master/mock
  // https://github.com/webpack/jade-loader/issues/8#issuecomment-55568520
  node: {
    fs: 'empty',
    child_process: 'empty',
    net: 'empty',
    tls: 'empty',
  },

  // Ignore react-addons imports.
  plugins: [
    new webpack.IgnorePlugin(/^react-addons$/),
    new webpack.DefinePlugin({
      __CLIENT__: false,
      __SERVER__: true,
      __DEVELOPMENT__: true,
      __PRODUCTION__: false,
    }),
  ],

  // Required for enzyme to work properly.
  externals: {
    jsdom: 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
  },
  resolve: {
    modulesDirectories: modules,
    modules,
    alias: {
      // Required for enzyme to work properly.
      sinon: 'sinon/pkg/sinon',

      // Add the 'app' alias here because we are using this file in the
      // .eslintrc for validating the imports with the import resolver plugin.
      // Otherwise we would get linting errors. We are not actually using this
      // alias in our tests though.
      app: path.resolve(process.cwd(), 'app', 'screens', 'App'),
      shared: path.resolve(process.cwd(), 'app', 'shared'),
    },
  },
};
