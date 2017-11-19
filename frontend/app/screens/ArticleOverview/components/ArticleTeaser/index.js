// @flow

import React from 'react';
import Link from 'AsyncLink';
import gql from 'graphql-tag';
import Html from 'Html';

/* eslint-disable react/no-unused-prop-types */
export type ArticleTeaserProps = {
  title: string,
  url: {
    alias: string,
  },
  body: string,
};
/* eslint-enable react/no-unused-prop-types */

const ArticleTeaser = ({
  title,
  url,
  body,
}: ArticleTeaserProps): React.Element<any> =>
  (<div>
    <h2>
      <Link to={url && url.alias}>
        {title}
      </Link>
    </h2>
    <Html>
      {body && body.summary}
    </Html>
  </div>);

ArticleTeaser.fragments = {
  articleTeaserFragment: gql`
    fragment ArticleTeaserFragment on NodeArticle {
      url: entityUrl {
        alias
      }
      title
      body {
        summary: summaryProcessed
      }
    }
  `,
};

export default ArticleTeaser;
