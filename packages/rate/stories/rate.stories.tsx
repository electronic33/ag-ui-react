import React from 'react';
import { FaStar } from 'react-icons/fa';
import { Rate } from '../src';

export default {
  title: 'OTHERS/Rate',
  component: Rate,
};

export const Default = () => (
  <Rate
    numberOfStars={5}
    StarIcon={FaStar}
    activeClassName="text-yellow-500 "
    disabledClassName="text-gray-200 "
    labels={[
      'bruh',
      'hmm',
      'ok',
      'fasza',
      'zsir',
      'meno',
      'kiraly',
      'nagyon kiraly',
      'allat',
      'fantasztikus',
    ]}
  />
);
