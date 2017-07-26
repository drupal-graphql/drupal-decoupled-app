// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StaticRouter } from 'react-router-dom';
import preloadTree from 'utils/preloadTree';

export default class Preloader extends Component {
  static childContextTypes = {
    preloader: PropTypes.shape({
      preload: PropTypes.func.isRequired,
      loading: PropTypes.bool.isRequired,
    }).isRequired,
  };

  state = {
    loading: false,
  };

  getChildContext() {
    return {
      preloader: {
        preload: this.preload,
        loading: this.state.loading,
      },
    };
  }

  preload = (href: string) => {
    this.setState({ loading: true });

    const routerContext = {};
    const rootElement = (
      <StaticRouter location={href} context={routerContext}>
        {this.props.children}
      </StaticRouter>
    );

    // Mock the preloader context.
    const rootContext = {
      ...(this.props.context || {}),
      preloader: {
        preload: () => Promise.resolve(),
        loading: true,
      },
    };

    return preloadTree(rootElement, rootContext)
      .then(() =>
        // If the app was redirected during preloading, we need to
        // also preload the next route.
         routerContext.url && this.preload(routerContext.url))
      .then(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    return React.Children.only(this.props.children);
  }
}
