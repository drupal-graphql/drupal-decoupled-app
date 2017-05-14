// @flow

import { asyncComponent } from 'react-async-component';

const AsyncBasicPage = asyncComponent({
  resolve: () => System.import('./component'),
});

export default AsyncBasicPage;
