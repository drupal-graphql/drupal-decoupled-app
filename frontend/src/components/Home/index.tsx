import React, { StatelessComponent } from 'react';
import Link from '~/components/Link';
import styles from './styles.css';

export const Home: StatelessComponent<{}> = () => (
  <div className="Wrapper">
    <style jsx>{styles}</style>
    <h1>Welcome!</h1>
    <p>
      This is a simple demo application for Decoupled Drupal using React and
      GraphQL.
    </p>
    <Link href="/node">Continue to the node overview.</Link>
  </div>
);

export default Home;
