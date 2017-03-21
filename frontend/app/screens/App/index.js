// @flow

import React from 'react';
import Helmet from 'react-helmet';

type AppProps = {
  children: React.Element<any>,
};

const App = ({
  children,
}: AppProps): React.Element<any> => (
  <div>
    <Helmet
      titleTemplate="Decoupled Drupal - %s"
      defaultTitle="Decoupled Drupal"
    />
    {children}
  </div>
);

export default App;
