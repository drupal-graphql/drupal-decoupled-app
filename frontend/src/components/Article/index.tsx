import React from 'react';
import Link from '@components/Link';
import styles from './styles.css';

const Article = ({ title, body }) => (
  <div className="Wrapper">
    <style jsx>{styles}</style>
    <h1>{title}</h1>
    <div dangerouslySetInnerHTML={{ __html: body && body.text }} />
    <Link href="/node">Back to overview</Link>
  </div>
);

export default Article;
