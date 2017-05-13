// @flow

import 'App/styles';

import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

type AppProps = {
  children: React.Element<any>,
};

const Wrapper = styled.div`
  max-width: 1000px;
  margin: auto;
`;

const App = ({ children }: AppProps): React.Element<any> => (
  <Wrapper>
    <Helmet
      titleTemplate="Decoupled Drupal - %s"
      defaultTitle="Decoupled Drupal"
    />
    {children}
  </Wrapper>
);

export default App;
