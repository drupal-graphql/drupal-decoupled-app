// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class AsyncLink extends Link {
  static contextTypes = {
    preloader: PropTypes.shape({
      preload: PropTypes.func.isRequired,
      loading: PropTypes.bool.isRequired,
    }),
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired,
        createHref: PropTypes.func.isRequired,
      }).isRequired,
      route: PropTypes.object,
    }).isRequired,
  };

  render() {
    const { router: { history } } = this.context;
    const { to, replace, children, ...props } = this.props;
    const href = history.createHref(
      typeof to === 'string' ? { pathname: to } : to,
    );

    const onClick = event => {
      event.preventDefault();
      event.persist();

      // eslint-disable-next-line no-param-reassign
      event.defaultPrevented = false;

      const handleClick = () => {
        // $FlowIgnore
        this.handleClick(event);
      };

      this.context.preloader.preload(href).then(handleClick).catch(handleClick);
    };

    return (
      <a {...props} onClick={onClick} href={href}>
        {children}
      </a>
    );
  }
}
