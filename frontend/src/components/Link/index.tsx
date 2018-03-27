import React from 'react';
import { Link } from '@routes';

const NextLink = ({ href, ...props }) => (
  <Link route={href}>
    <a {...props} href={href} />
  </Link>
);

export default NextLink;
