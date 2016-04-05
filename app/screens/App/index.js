/**
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

// Reset all browser styles to a common ground.
import './reset.css';

import React from 'react';
import { connect } from 'react-redux';
import selectLocationState from 'selectors/locationStateSelector';
import styles from './styles.css';

const App = (props) => (
  <div className={styles.App}>
    {props.children}
  </div>
);

export default connect(selectLocationState)(App);
