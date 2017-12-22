// @flow

import universal from 'react-universal-component';
import { withPreloading } from 'react-preload-core';
import compose from 'recompose/compose';

const withPreloadedComponent = withPreloading((element) => {
  // Check if the current component is a lazy component wrapper.
  if (element && element.type && typeof element.type.preload === 'function') {
    // Preload the component file.
    const preload = element.type.preload();

    if (preload && preload.then && typeof preload.then === 'function') {
      return preload;
    }
  }

  return true;
});

export default compose(withPreloadedComponent, universal);
