// @flow

import universal from 'react-universal-component';

export default universal(() => import('../Home/component'), {
  resolve: () => require.resolveWeak('../Home/component'),
  loading: () => null,
  chunkName: 'Home/component',
});
