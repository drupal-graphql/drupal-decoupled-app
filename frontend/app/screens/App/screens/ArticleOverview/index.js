// @flow

import { asyncComponent } from 'react-async-component';

const AsyncArticleOverview = asyncComponent({
  resolve: () => System.import('./component'),
});

export default AsyncArticleOverview;
