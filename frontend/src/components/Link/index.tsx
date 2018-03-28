import { Link } from '@routes';
import React from 'react';

const NextLink = ({ href, ...props }) => (
  <Link route={href}>
    <a {...props} href={href} />
  </Link>
);

export default NextLink;
