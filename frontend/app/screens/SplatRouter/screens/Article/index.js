// @flow

import universal from 'react-universal-component';

export default universal(() => import('../Article/component'), {
  resolve: () => require.resolveWeak('../Article/component'),
  loading: () => null,
  chunkName: 'Article/component',
});
