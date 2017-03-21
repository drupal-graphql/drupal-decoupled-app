// @flow

import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

const NotFound = (): React.Element<any> => (
  <div>
    <Helmet title="Page not found" />
    <div>
      <h1>Page not found</h1>
      <p>
        These aren't the droids you're looking for.
      </p>
      <p>
        <Link to="/">Back to the front page</Link>
      </p>
    </div>
  </div>
);

export default NotFound;
