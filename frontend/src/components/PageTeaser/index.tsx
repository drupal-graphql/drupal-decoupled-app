import React from 'react';
import Link from '@components/Link';
import styles from './styles.css';

const PageTeaser = ({ title, url, body }) => (
  <div className="Wrapper">
    <style jsx>{styles}</style>
    <h1>
      <Link href={url && url.alias}>{title}</Link>
    </h1>
    <div dangerouslySetInnerHTML={{ __html: body && body.summary }} />
  </div>
);

export default PageTeaser;
