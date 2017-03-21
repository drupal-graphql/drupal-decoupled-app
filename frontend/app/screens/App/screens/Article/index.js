// @flow

import React from 'react';
import Helmet from 'react-helmet';
import gql from 'graphql-tag';

type ArticleProps = {
  title: string,
};

const Article = ({
  title,
}: ArticleProps): React.Element<any> => (
  <div>
    <Helmet title={title} />
    <h1>{title}</h1>
  </div>
);

Article.fragments = {
  articleFragment: gql`
    fragment ArticleFragment on Article {
      title
    }
  `,
};

export default Article;
