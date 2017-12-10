// @flow

import { createLink } from 'react-router-preload-tree';
import { preloadApollo } from 'react-preload-apollo';
import { preloadUniversalComponent } from 'react-preload-universal-component';

export default createLink([
  preloadApollo,
  preloadUniversalComponent,
]);
