/**
 * @file    develop node express server
 * @author  Sebastian Siemssen <sebastian@amazeelabs.com>
 * @date    2016-01-01
 */


import path from 'path';
import ejs from 'ejs';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import gitRevSync from 'git-rev-sync';
import DashboardPlugin from 'webpack-dashboard/plugin';

export default (app, options) => {

  const compiler = webpack(options);

  // Add the webpack dashboard plugin for some fancyness.
  compiler.apply(new DashboardPlugin());

  const middleware = devMiddleware(
    compiler,
    {
      publicPath : options.output.publicPath,
      noInfo     : true,
      lazy       : false,
      hot        : true,
      silent     : true,
    }
  );

  app.use(middleware);
  app.use(hotMiddleware(compiler));

  // Since the dev middleware uses memory-fs internally to store build
  // artifacts, we use it instead.
  const fs = middleware.fileSystem;

  app.get(/\.dll\.js$/, (req, res) => {

    const filename = req.path.replace(/^\//, '');
    res.sendFile(path.join(process.cwd(), 'dlls', filename));

  });

  app.get('*', (req, res) => {

    const template = path.resolve(process.cwd(), 'build', 'views', 'index.ejs');
    const string = fs.readFileSync(template).toString();

    const data = {
      initialState    : JSON.stringify({}),
      preloadedData   : JSON.stringify([]),
      renderedContent : '',
      htmlAttributes  : '',
      htmlHead        : '',
      bodyClassName   : '',
      revision        : `${gitRevSync.branch()}/${gitRevSync.long()}`,
      buildDate       : (new Date()).toString(),
      webpackDll      : true,
    };

    res.send(ejs.render(string, data, {
      rmWhitespace : false,
    }));

  });

};
