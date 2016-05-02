const path = require('path');

module.exports = (options) => ({
  entry: options.entry,
  context: path.resolve(process.cwd(), 'app'),
  output: options.output, // Merge with env dependent settings.
  module: {
    loaders: (options.loaders || []).concat([{
      test: /\.js$/, // Transform all .js files required somewhere with Babel.
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        // This can't be loaded through .babelrc for some reason.
        plugins: [path.resolve(process.cwd(), 'internals', 'webpack', 'relay'), 'transform-flow-strip-types'],
      },
    }, {
      test: /\.jpe?g$|\.gif$|\.png$/i,
      loader: 'url-loader?limit=10000',
    }]),
  },
  plugins: options.plugins,
  postcss: () => options.postcssPlugins,
  resolve: {
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
