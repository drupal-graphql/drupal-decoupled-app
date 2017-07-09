// @flow

import React from 'react';
import universal from 'react-universal-component';
import type { ArticleOverviewProps } from './component';

const Component = universal(
  () => import(/* webpackChunkName: 'ArticleOverview' */ './component'),
  {
    resolve: () => require.resolveWeak('./component'),
    loading: () => null,
    chunkName: 'ArticleOverview',
  },
);

export default (props: ArticleOverviewProps) => <Component {...props} />;
