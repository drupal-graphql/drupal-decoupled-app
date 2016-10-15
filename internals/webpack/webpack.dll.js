/**
 * @file    webpack dll config
 * @author  Sebastian Siemssen <sebastian@amazeelabs.com>
 * @date    2016-01-01
 */

const path        = require('path');
const webpack     = require('webpack');
const packageJson = require(path.join(process.cwd(), 'package.json')); // eslint-disable-line import/no-dynamic-require
const outputPath  = path.join(process.cwd(), 'dlls');

const include = Object.keys(packageJson.dependencies);
const exclude = packageJson.dll && packageJson.dll.exclude || [];

module.exports = {
  context : process.cwd(),
  entry   : {
    dependencies : include.filter((i) => exclude.indexOf(i) === -1),
  },
  devtool : 'eval',
  output  : {
    filename : '[name].dll.js',
    path     : outputPath,
    library  : '[name]',
  },
  plugins : [

    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.DllPlugin({
      name : '[name]',
      path : path.join(outputPath, '[name].json'),
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
  node: {
    fs: 'empty',
  },
};
