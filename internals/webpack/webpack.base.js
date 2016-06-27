/**
 * @file    base webpack config
 * @author  Sebastian Siemssen <sebastian@amazeelabs.com>
 * @date    2016-01-01
 */

const path = require('path');

// flow-ignore-next-line
module.exports = (options) => ({
  entry: options.entry,
  context: options.context || path.resolve(process.cwd(), 'app'),
  output: options.output, // Merge with env dependent settings.
  module: {
    loaders: (options.loaders || [])
      .concat([{
        test: /\.js$/, // Transform all .js files required somewhere with Babel.
        loader: 'babel',
        exclude: /node_modules/,
        query: options.babelQuery || {},
      }, {
        test: /\.jpe?g$|\.gif$|\.png$/i,
        loader: 'url-loader?limit=10000',
      },
    ]),
  },
  plugins: options.plugins,
  postcss: () => options.postcssPlugins,
  resolve: {
    alias: Object.assign({}, options.resolveAliases || {}, {
      // Add custom aliases here.
    }),
    modules: [
      'screens',
      'components',
      'shared',
      'node_modules',
    ],
    extensions: ['', '.js'],
    packageMains: [
      'jsnext:main',
      'main',
    ],
  },
  devtool: options.devtool,
  target: options.target || 'web', // Make web variables accessible to webpack, e.g. window.
  stats: false, // Don't show stats in the console.
  progress: true,
});
