// @flow

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./component'),
  loading: () => null,
});
