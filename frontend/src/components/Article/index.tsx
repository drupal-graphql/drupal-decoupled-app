import React, { StatelessComponent } from 'react';
import Link from '~/components/Link';
import styles from './styles.css';

export interface IArticleFragment {
  __typename: string;
  title: string;
  body: {
    __typename: string;
    text: string;
  };
}

// tslint:disable-next-line:no-empty-interface
export interface IArticleProps extends IArticleFragment {}

const Article: StatelessComponent<IArticleProps> = ({ title, body }) => (
  <div className="Wrapper">
    <style jsx>{styles}</style>
    <h1>{title}</h1>
    <div dangerouslySetInnerHTML={{ __html: body && body.text }} />
    <Link href="/node">Back to overview</Link>
  </div>
);

export default Article;
