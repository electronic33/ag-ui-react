import React from 'react';
import { Link } from '@app-garage/link';
import { BreadCrumbs } from '../src';

export default {
  title: 'NAVIGATION/Breadcrumbs',
  component: BreadCrumbs,
};

const paths = [
  { label: 'App' },
  { label: 'Főoldal', to: '/' },
  { label: 'Rendelések', to: '/comenzi' },
];

export const Default = (): React.ReactNode => (
  <BreadCrumbs LinkComponent={Link} items={paths} />
);
