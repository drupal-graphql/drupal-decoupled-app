// @flow

import React from 'react';
import Helmet from 'react-helmet';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Title from 'Title';
import Body from 'Body';

type BasicPageProps = {
  title: string,
  body: string,
};

const Wrapper = styled.div`
  background-color: Red;
  margin: 1rem 0;
`;

const BasicPage = ({ title, body }: BasicPageProps): React.Element<any> => (
  <Wrapper>
    <Helmet title={title} />
    <Title>{title}</Title>
    <Body>{body}</Body>
  </Wrapper>
);

BasicPage.fragments = {
  basicPageFragment: gql`
    fragment BasicPageFragment on NodePage {
      title
      body
    }
  `,
};

export default BasicPage;
