const path = require('path');
const webpack = require('webpack');

// PostCSS plugins.
const cssnext = require('postcss-cssnext');
const postcssFocus = require('postcss-focus');
const postcssReporter = require('postcss-reporter');

module.exports = require('./webpack.base')({
  // No need for any of the hot-reloading stuff on the server side.
  entry: {
    server: './entry/server',
  },

  // Don't use hashes in dev mode for better performance.
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    libraryTarget: 'commonjs2',
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/public',
  },

  loaders: [{
    // Transform our own .css files with PostCSS and CSS-modules.
    test: /\.css$/,
    exclude: /node_modules/,
    loader: 'css-loader/locals?modules&importLoaders=1!postcss-loader',
  }, {
    // Do not transform vendor's CSS with CSS-modules. The point is that they
    // remain in global scope. Since we require these CSS files in our JS or
    // CSS files, they will be a part of our compilation either way. So, no
    // need for ExtractTextPlugin here.
    test: /\.css$/,
    include: /node_modules/,
    loaders: ['css-loader/locals'],
  }, {
    test: /\.json$/,
    loader: 'json-loader',
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

  plugins: [

    // Merge all duplicate modules.
    new webpack.optimize.DedupePlugin(),

    // Minify and optimize the JavaScript.
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),

    new webpack.DefinePlugin({
      __CLIENT__: false,
      __SERVER__: true,
      __DEVELOPMENT__: false,
      __PRODUCTION__: true,
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
      },
    }),
  ],

  target: 'node',
});
