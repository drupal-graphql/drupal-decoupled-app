// @flow

import React from 'react';
import Helmet from 'react-helmet';
import gql from 'graphql-tag';

type BasicPageProps = {
  title: string,
};

const BasicPage = ({
  title,
}: BasicPageProps): React.Element<any> => (
  <div>
    <Helmet title={title} />
    <h1>{title}</h1>
  </div>
);

BasicPage.fragments = {
  basicPageFragment: gql`
    fragment BasicPageFragment on BasicPage {
      title:entityLabel
    }
  `,
};

export default BasicPage;
