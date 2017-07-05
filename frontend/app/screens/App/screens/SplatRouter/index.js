// @flow

import universal from 'react-universal-component';

export default universal(
  () => import(/* webpackChunkName: 'SplatRouter' */ './component'),
  {
    resolve: () => require.resolveWeak('./component'),
    chunkName: 'SplatRouter',
    minDelay: 500,
  },
);
