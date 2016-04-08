const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// PostCSS plugins.
const cssnext = require('postcss-cssnext');
const postcssFocus = require('postcss-focus');
const postcssReporter = require('postcss-reporter');

module.exports = require('./webpack.base')({
  // Add hot reloading in development.
  entry: [
    'eventsource-polyfill', // Necessary for hot reloading with IE.
    'webpack-hot-middleware/client',
    './entry/client',
  ],

  // Don't use hashes in dev mode for better performance.
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    path: path.resolve(process.cwd(), 'build', 'public'),
    publicPath: '/',
  },

  // Load the CSS in a style tag in development.
  loaders: [{
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
  }],

  // Process the CSS with PostCSS.
  postcssPlugins: [
    postcssFocus(), // Add a :focus to every :hover
    cssnext({ // Allow future CSS features to be used, also auto-prefixes the CSS...
      browsers: ['last 2 versions', 'IE > 10'], // ...based on this browser list
    }),
    postcssReporter({ // Posts messages from plugins to the terminal
      clearMessages: true,
    }),
  ],

  // Add hot reloading
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common'),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'html!./app/index.ejs',
      filename: path.resolve(process.cwd(), 'build', 'views', 'index.ejs'),
      inject: true,
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __PRODUCTION__: false,
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
  ],

  // Tell babel that we want to hot-reload.
  babelQuery: {

    // This can't be loaded through .babelrc for some reason.
    plugins: [path.resolve(process.cwd(), 'internals', 'webpack', 'relay')],
  },

  // Emit a source map for easier debugging.
  devtool: 'inline-source-map',
});
