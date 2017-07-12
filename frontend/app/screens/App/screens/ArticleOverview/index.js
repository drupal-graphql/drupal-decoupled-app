// @flow

import universal from 'react-universal-component';

export default universal(() => import('../ArticleOverview/component'), {
  resolve: () => require.resolveWeak('../ArticleOverview/component'),
  loading: () => null,
  chunkName: 'ArticleOverview/component',
});
