const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

// PostCSS plugins.
const cssnext = require('postcss-cssnext');
const postcssFocus = require('postcss-focus');
const postcssReporter = require('postcss-reporter');

module.exports = require('./webpack.base')({
  // In production, we skip all hot-reloading stuff.
  entry: [
    './entry/client',
  ],

  // Utilize long-term caching by adding content hashes (not compilation hashes)
  // to compiled assets.
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(process.cwd(), 'build', 'public'),
    publicPath: '/',
  },

  // Load the CSS in a style tag in development.
  loaders: [{
    // Transform our own .css files with PostCSS and CSS-modules.
    test: /\.css$/,
    exclude: /node_modules/,

    // We use ExtractTextPlugin so we get a seperate CSS file instead of the CSS
    // being in the JS and injected as a style tag.
    loader: ExtractTextPlugin.extract(
      'style-loader',
      'css-loader?modules&importLoaders=1!postcss-loader'
    ),
  }, {
    // Do not transform vendor's CSS with CSS-modules. The point is that they
    // remain in global scope. Since we require these CSS files in our JS or
    // CSS files, they will be a part of our compilation either way. So, no
    // need for ExtractTextPlugin here.
    test: /\.css$/,
    include: /node_modules/,
    loaders: ['style-loader', 'css-loader'],
  }],

  // In production, we minify our CSS with cssnano.
  postcssPlugins: [
    postcssFocus(),
    cssnext({
      browsers: ['last 2 versions', 'IE > 10'],
    }),
    postcssReporter({
      clearMessages: true,
    }),
  ],
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common.js'),

    // OccurrenceOrderPlugin is needed for long-term caching to work properly.
    // See http://mxs.is/googmv
    new webpack.optimize.OccurrenceOrderPlugin(true),

    // Merge all duplicate modules.
    new webpack.optimize.DedupePlugin(),

    // // Minify and optimize the JavaScript.
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),

    // Extract the CSS into a seperate file.
    new ExtractTextPlugin('[name].css', {
      allChunks: true,
    }),

    // Set the process.env to production so React includes the production
    // version of itself.
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __PRODUCTION__: true,
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
      },
    }),

    // Put it in the end to capture all the HtmlWebpackPlugin's assets
    // manipulations and do leak its manipulations to HtmlWebpackPlugin.
    new OfflinePlugin({
      caches: {
        main: [':rest:'],

        // All chunks marked as `additional`, loaded after main section and do
        // not prevent SW to install. Change to `optional` if do not want them
        // to be preloaded at all (cached only when first loaded).
        additional: ['*.chunk.js'],
      },

      AppCache: false,

      ServiceWorker: {
        output: '/serviceworker.js',
      },
    }),
  ],
});
