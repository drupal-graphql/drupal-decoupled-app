const path = require('path');
const ejs = require('ejs');
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

  // Since the dev middleware uses memory-fs internally to store build
  // artifacts, we use it instead.
  const fs = middleware.fileSystem;
  const template = path.resolve(process.cwd(), 'build', 'views', 'index.ejs');

  app.get('*', (req, res) => {
    const string = fs.readFileSync(template).toString();
    const data = {
      initialState: JSON.stringify({}),
      preloadedData: JSON.stringify([]),
      renderedContent: '',
    };

    res.send(ejs.render(string, data, {
      rmWhitespace: false,
    }));
  });
};
