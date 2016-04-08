/* istanbul ignore next */

import Relay from 'react-relay';
import App from 'App';

const errorLoading = (error) =>
  console.error('Dynamic page loading failed', error);

const childRoutes = () => [{
  path: '/films',
  queries: {
    list: () => Relay.QL`query {
      allFilms
    }`,
  },
  getComponent: (location, callback) => {
    if (__CLIENT__) {
      System.import('App/screens/Films')
        .then((module) => callback(null, module.default))
        .catch(errorLoading);
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
        System.import('App/screens/Films/screens/FilmDetails')
          .then((module) => callback(null, module.default))
          .catch(errorLoading);
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
        System.import('App/screens/Home')
          .then((module) => callback(null, module.default))
          .catch(errorLoading);
      } else {
        callback(null, require('App/screens/Home').default);
      }
    },
  },
  childRoutes: [...childRoutes(store), {
    path: '*',
    getComponent: (location, callback) => {
      if (__CLIENT__) {
        System.import('App/screens/NotFound')
          .then((module) => callback(null, module.default))
          .catch(errorLoading);
      } else {
        callback(null, require('App/screens/NotFound').default);
      }
    },
  }],
});
