// @flow

import universal from 'react-universal-component';

export default universal(() => import('../BasicPage/component'), {
  resolve: () => require.resolveWeak('../BasicPage/component'),
  loading: () => null,
  chunkName: 'BasicPage/component',
});
