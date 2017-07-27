// @flow

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

  handleClickOriginal = this.handleClick;

  handleClick = event => {
    event.preventDefault();
    event.persist();
    // eslint-disable-next-line no-param-reassign
    event.defaultPrevented = false;

    const href = this.context.router.history.createHref(
      typeof this.props.to === 'string'
        ? { pathname: this.props.to }
        : this.props.to,
    );

    this.context.preloader
      .preload(href)
      .then(
        () => this.handleClickOriginal(event),
        () => this.handleClickOriginal(event),
      );
  };
}
