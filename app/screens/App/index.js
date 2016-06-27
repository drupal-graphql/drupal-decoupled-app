/**
 * @file    This component is the skeleton around the actual pages, and should
 *          only contain code that should be seen on all pages. (e.g. navigation
 *          bar)
 * @author  unknown
 * @date    2016-01-01
 * @flow
 */

import './reset.css';
import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import selectLocationState from 'selectors/locationStateSelector';
import styles from './styles.css';

/**
 * AppProps
 *
 * @desc  app props
 * @interface
 */
type AppProps = {
  params: Object,
  children: string,
};

/**
 * meta data
 *
 * @desc  define meta data
 * @type {Array<Object>}
 */
const metaData : Array<Object> = [{
  'http-equiv': 'content-type',
  content: 'text/html; charset=utf-8',
}, {
  name: 'charset',
  content: 'UTF-8',
}, {
  name: 'viewport',
  content: 'width=device-width, initial-scale=1',
}, {
  name: 'mobile-web-app-capable',
  content: 'yes',
}];

/**
 * html attributes
 *
 * @desc  html meta data attributes
 * @type {Object}
 */
const htmlAttributes : Object = {
  lang: 'en',
  amp: undefined,
};

/**
 * meta links
 *
 * @desc  array of meta links
 * @type {Array<Object>}
 */
const metaLinks : Array<Object> = [{
  rel: 'manifest',
  href: '/manifest.json',
}];

/**
 * App
 *
 * @desc    render app component
 * @param   {IAppProps} props   - app properties
 * @returns {React.Element}
 */
const App = (props: AppProps) : React.Element => (
  <div className={styles.App}>
    <Helmet
      htmlAttributes={htmlAttributes}
      titleTemplate="Drupal Decoupled App - %s"
      defaultTitle="Drupal Decoupled App"
      meta={metaData}
      link={metaLinks}
    />
    {props.children}
  </div>
);

export default connect(selectLocationState)(App);
