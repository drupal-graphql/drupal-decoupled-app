// @flow

import universal from 'react-universal-component';

export default universal(() => import('../NotFound/component'), {
  resolve: () => require.resolveWeak('../NotFound/component'),
  loading: () => null,
  chunkName: 'NotFound/component',
});
