const webpack = require('webpack');
const path = require('path');
const ejs = require('ejs');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const options = require('../internals/webpack/webpack.dev');
const render = require(path.resolve(process.cwd(), 'build', 'server')).default;

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

  // The webpack-dev-middleware package uses memory-fs internally to store
  // build artifacts.
  const fileSystem = middleware.fileSystem;
  const templatePath = path.join(compiler.outputPath, '..', 'views', 'index.ejs');

  const template = (data) => {
    const templateString = fileSystem.readFileSync(templatePath).toString();
    return ejs.render(templateString, data);
  };

  // This is where the magic happens.
  app.get('*', (req, res, next) => render(req, res, next, template));
};
