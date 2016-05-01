/* eslint-disable global-require */

/**
 * create routes
 *
 * @flow
 */
import Relay from 'react-relay';
import App from 'App';
import { IndexRoute, Route } from 'react-router';

const childRoutes = (): Route[] => [{
  path: '/films',
  queries: {
    list: () => Relay.QL`query {
      allFilms
    }`,
  },
  getComponent: (location: Object, callback: Function) => {
    if (__CLIENT__) {
      require.ensure([], (require) => {
        callback(null, require('App/screens/Films').default);
      }, 'App/screens/Films');
    } else {
      callback(null, require('App/screens/Films').default);
    }
  },

  childRoutes: [{
    path: '/films/:id',
    queries: {
      film: () => Relay.QL`query {
        film(id: $id)
      }`,
    },
    getComponent: (location, callback) => {
      if (__CLIENT__) {
        require.ensure([], (require) => {
          callback(null, require('App/screens/Films/screens/FilmDetails').default);
        }, 'App/screens/Films/screens/FilmDetails');
      } else {
        callback(null, require('App/screens/Films/screens/FilmDetails').default);
      }
    },
  }],
}];

export default (): IndexRoute => ({
  path: '/',
  component: App,
  indexRoute: {
    getComponent: (location: Object, callback: Function) => {
      if (__CLIENT__) {
        require.ensure([], (require) => {
          callback(null, require('App/screens/Home').default);
        }, 'App/screens/Home');
      } else {
        callback(null, require('App/screens/Home').default);
      }
    },
  },
  childRoutes: [...childRoutes(), {
    path: '*',
    getComponent: (location: Object, callback: Function) => {
      if (__CLIENT__) {
        require.ensure([], (require) => {
          callback(null, require('App/screens/NotFound').default);
        }, 'App/screens/NotFound');
      } else {
        callback(null, require('App/screens/NotFound').default);
      }
    },
  }],
});
