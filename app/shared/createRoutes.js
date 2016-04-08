/* istanbul ignore next */

import Relay from 'react-relay';
import App from 'App';

const childRoutes = () => [{
  path: '/films',
  queries: {
    list: () => Relay.QL`query {
      allFilms
    }`,
  },
  getComponent: (location, callback) => {
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

export default (store) => ({
  path: '/',
  component: App,
  indexRoute: {
    getComponent: (location, callback) => {
      if (__CLIENT__) {
        require.ensure([], (require) => {
          callback(null, require('App/screens/Home').default);
        }, 'App/screens/Home');
      } else {
        callback(null, require('App/screens/Home').default);
      }
    },
  },
  childRoutes: [...childRoutes(store), {
    path: '*',
    getComponent: (location, callback) => {
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
