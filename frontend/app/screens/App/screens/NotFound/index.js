// @flow

import React from 'react';
import universal from 'react-universal-component';
import type { NotFoundProps } from './component';

const Component = universal(
  () => import(/* webpackChunkName: 'NotFound' */ './component'),
  {
    resolve: () => require.resolveWeak('./component'),
    loading: () => null,
    chunkName: 'NotFound',
  },
);

export default (props: NotFoundProps) => <Component {...props} />;
