// @flow

import { asyncComponent } from 'react-async-component';

const AsyncSplatRouter = asyncComponent({
  resolve: () => System.import('./component'),
});

export default AsyncSplatRouter;
