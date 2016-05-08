/**
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * @flow
 */

// Reset all browser styles to a common ground.
import './reset.css';

import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import selectLocationState from 'selectors/locationStateSelector';
import styles from './styles.css';

interface IAppProps {
  children: string;
}

const App = (props: IAppProps) =>
  <div className={styles.App}>
    <Helmet
      htmlAttributes={{ lang: 'en', amp: undefined }}
      titleTemplate="Decoupled Drupal - %s"
      defaultTitle="Decoupled Drupal"
      meta={[
        { 'http-equiv': 'content-type', content: 'text/html; charset=utf-8' },
        { name: 'charset', content: 'UTF-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'mobile-web-app-capable', content: 'yes' },
      ]}
      link={[
        { rel: 'manifest', href: '/manifest.json' },
      ]}
    />
    {props.children}
  </div>;

export default connect(selectLocationState)(App);
