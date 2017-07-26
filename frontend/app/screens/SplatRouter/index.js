// @flow

import universal from 'react-universal-component';

export default universal(() => import('../SplatRouter/component'), {
  resolve: () => require.resolveWeak('../SplatRouter/component'),
  loading: () => null,
  chunkName: 'SplatRouter/component',
});
