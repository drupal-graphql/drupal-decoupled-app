// @flow

import React from 'react';
import Helmet from 'react-helmet';
import gql from 'graphql-tag';
import styled from 'styled-components';

type BasicPageProps = {
  title: string,
  body: string,
};

const Wrapper = styled.div`
  background-color: Red;
  margin: 1rem 0;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 1rem;
`;

const Body = styled.div`
  font-size: 16px;
`;

const BasicPage = ({ title, body }: BasicPageProps): React.Element<any> => (
  <Wrapper>
    <Helmet title={title} />
    <Title>{title}</Title>
    {/* eslint-disable react/no-danger */}
    <Body dangerouslySetInnerHTML={{ __html: body }} />
    {/* eslint-enable react/no-danger */}
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
