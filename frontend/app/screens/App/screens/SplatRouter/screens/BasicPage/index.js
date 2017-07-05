// @flow

import React from 'react';
import universal from 'react-universal-component';

const Component = universal(
  () => import(/* webpackChunkName: 'BasicPage' */ './component'),
  {
    resolve: () => require.resolveWeak('./component'),
    loading: () => null,
    chunkName: 'BasicPage',
  },
);

export default props => <Component {...props} />;
