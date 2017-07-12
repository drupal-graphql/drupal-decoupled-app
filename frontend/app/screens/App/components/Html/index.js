// @flow

import React from 'react';

type HtmlProps = {
  children: React.Element<any>,
};

/* eslint-disable react/no-danger */
const Html = ({ children }: HtmlProps) =>
  <div dangerouslySetInnerHTML={{ __html: children }} />;
/* eslint-enable react/no-danger */

export default Html;
