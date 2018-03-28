import { Link } from '@routes';
import React, { StatelessComponent } from 'react';

export interface ILinkProps {
  href: string;
  [key: string]: any;
}

const NextLink: StatelessComponent<ILinkProps> = ({ href, ...props }) => (
  <Link route={href}>
    <a {...props} href={href} />
  </Link>
);

export default NextLink;
