// @flow

import React from 'react';
import { withLoadingState } from 'react-router-preload-core';
import styles from './styles.css';

const LoadingIndicator = ({ loading }) => loading && (
  <div className={styles.LoadingIndicator}>
    <div className={styles.LoadingIndicatorItem}>
      <div className={styles.LoadingBar} />
    </div>
    <div className={styles.LoadingIndicatorItem}>
      <div className={styles.LoadingBar} />
    </div>
  </div>
) || null;
    
export default withLoadingState(LoadingIndicator);
