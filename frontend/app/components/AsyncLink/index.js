// @flow

import { createTreeWalkerLink, preloadTreeApollo, preloadTreeUniversalComponent } from 'react-router-preload';

export default createTreeWalkerLink([
  preloadTreeApollo,
  preloadTreeUniversalComponent,
]);
