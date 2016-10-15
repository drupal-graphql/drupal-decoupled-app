// @flow

import React from 'react';
import type { ArticleProps } from './typings';
import styles from './styles.css';

const Article = ({ title, body, setRandomColor, articleColor } : ArticleProps) => (
  <div className={styles.Article} style={{ backgroundColor: articleColor }}>
    <button onClick={setRandomColor}>Color magic</button>
    <h2 className={styles.Header}>{title}</h2>
    <p className={styles.Body}>{body}</p>
  </div>
);

export default Article;
