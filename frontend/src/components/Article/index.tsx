import Link from '@components/Link';
import React from 'react';
import styles from './styles.css';

export interface IArticleFragment {
  __typename: string;
  title: string;
  body: {
    __typename: string;
    text: string;
  };
}

const Article = ({ title, body }) => (
  <div className="Wrapper">
    <style jsx>{styles}</style>
    <h1>{title}</h1>
    <div dangerouslySetInnerHTML={{ __html: body && body.text }} />
    <Link href="/node">Back to overview</Link>
  </div>
);

export default Article;
