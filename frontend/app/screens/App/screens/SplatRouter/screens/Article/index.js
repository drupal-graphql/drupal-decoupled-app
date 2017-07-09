// @flow

import React from 'react';
import universal from 'react-universal-component';
import type { ArticleProps } from './component';

const Component = universal(
  () => import(/* webpackChunkName: 'Article' */ './component'),
  {
    resolve: () => require.resolveWeak('./component'),
    loading: () => null,
    chunkName: 'Article',
  },
);

export default (props: ArticleProps) => <Component {...props} />;
