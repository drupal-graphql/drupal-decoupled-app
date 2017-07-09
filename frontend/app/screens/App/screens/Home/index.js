// @flow

import React from 'react';
import universal from 'react-universal-component';
import type { HomeProps } from './component';

const Component = universal(
  () => import(/* webpackChunkName: 'Home' */ './component'),
  {
    resolve: () => require.resolveWeak('./component'),
    loading: () => null,
    chunkName: 'Home',
  },
);

export default (props: HomeProps) => <Component {...props} />;
