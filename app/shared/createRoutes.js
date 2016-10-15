/**
 * create routes
 *
 * @flow
 */

 /* eslint-disable global-require */

import Relay from 'react-relay';
import App from 'App';
import { IndexRoute, Route } from 'react-router';
import { injectAsyncReducer } from 'configureStore';

const errorLoading = (error) => console.error('Dynamic page loading failed.', error); // eslint-disable-line no-console
const loadModule = (callback) => (module) => callback(null, module.default);
const loadReducer = (store, name) => (module) => injectAsyncReducer( // eslint-disable-line no-unused-vars
  store,
  name,
  module.default,
);

const childRoutes = (): Route[] => [
  {

    // Additional route definitions go here.
  },
];

export default (store: Function): IndexRoute => ({ // eslint-disable-line no-unused-vars
  path       : '/',
  component  : App,
  indexRoute : {
    queries : {
      articleList : () => Relay.QL`query {
        viewer
      }`,
    },
    getComponent : (location: Object, callback: Function) => {
      if (__CLIENT__) {
        System.import('App/screens/Home')
          .then(loadModule(callback))
          .catch(errorLoading);
      } else {
        callback(null, require('App/screens/Home').default);
      }
    },
  },
  childRoutes : __CLIENT__ ? [...childRoutes(),
    {
      path         : '/*',
      getComponent : (location: Object, callback: Function) => {
        System.import('App/screens/NotFound')
          .then(loadModule(callback))
          .catch(errorLoading);
      },
    },
  ] : [...childRoutes()],
});
