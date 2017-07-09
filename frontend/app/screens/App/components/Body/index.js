// @flow

import React from 'react';
import styled from 'styled-components';

type BodyProps = {
  children: React.Element<any>,
};

const StyledBody = styled.div`font-size: 1rem;`;

/* eslint-disable react/no-danger */
const Body = ({ children }: BodyProps) =>
  <StyledBody dangerouslySetInnerHTML={{ __html: children }} />;
/* eslint-enable react/no-danger */

export default Body;
