import React, { StatelessComponent } from 'react';
import Link from '~/components/Link';
import styles from './styles.css';

export interface IArticleTeaserFragment {
  __typename: string;
  title: string;
  url: {
    __typename: string;
    alias: string;
  };
  body: {
    __typename: string;
    summary: string;
  };
}

// tslint:disable-next-line:no-empty-interface
export interface IArticleTeaserProps extends IArticleTeaserFragment {}

const ArticleTeaser: StatelessComponent<IArticleTeaserProps> = ({
  title,
  url,
  body,
}) => (
  <div className="Wrapper">
    <style jsx>{styles}</style>
    <h1>
      <Link href={url && url.alias}>{title}</Link>
    </h1>
    <div dangerouslySetInnerHTML={{ __html: body && body.summary }} />
  </div>
);

export default ArticleTeaser;
