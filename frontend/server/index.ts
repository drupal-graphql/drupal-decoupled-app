// TODO: Convert the custom server implementation to typescript.

import * as compression from 'compression';
import * as express from 'express';
import * as next from 'next';
import { parse } from 'url';
import routes from './routes';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: 'src', dev });

app.prepare().then(() => {
  const server = express();

  if (process.env.NODE_ENV === 'production') {
    // Add gzip compression.
    server.use(compression());
  }

  // Catch any requests to static files not served by next.
  server.use(/^(?!\/_next)(.*)\.(.*)/, (req, res) => {
    app.render404(req, res, parse(req.url, true));
  });

  server.use(routes.getRequestHandler(app));

  server.listen(process.env.PORT);
});
