import React from 'react';
import { Link } from '../src';

export default {
  title: 'NAVIGATION/Link',
  component: Link,
};

export const Default = (props): React.ReactNode => (
  <Link to="google.com" {...props}>
    Link
  </Link>
);
