// tslint:disable-next-line:no-var-requires
const routes = require('next-routes')();

routes.add('/', 'Home');
routes.add('/node', 'Overview');

// Dynamic catch-all router.
routes.add('/:splat*', 'Router');

export const Router = routes.Router;
export const Link = routes.Link;

export default routes;
