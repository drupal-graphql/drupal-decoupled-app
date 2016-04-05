const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const options = require('../internals/webpack/webpack.dev');

module.exports = (app) => {
  const compiler = webpack(options);
  const middleware = devMiddleware(compiler, {
    publicPath: options.output.publicPath,
    noInfo: true,
    lazy: false,
    hot: true,
    silent: true,
  });

  app.use(middleware);
  app.use(hotMiddleware(compiler));
};
