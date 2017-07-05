// @flow

import configureStore from 'state/configureStore';

export default (apolloClient: any): AmazeeStore<any, any> =>
  configureStore(apolloClient);
