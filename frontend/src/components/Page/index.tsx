import React from 'react';
import styles from './styles.css';

const Page = ({ title, body }) => (
  <div className="Wrapper">
    <style jsx>{styles}</style>
    <h1>{title}</h1>
    <div dangerouslySetInnerHTML={{ __html: body && body.text }} />
  </div>
);

export default Page;
