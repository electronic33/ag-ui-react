import React from 'react';
import classNames from 'classnames';

type SkeletonTypes = {
  className?: string;
  type?: 'circle' | 'square';
  width?: string | number;
  height?: string | number;
};

export const Skeleton = ({ className, type, width, height }: SkeletonTypes): React.ReactElement => (
  <div
    className={classNames(
      'skeleton animate-pulse',
      {
        'rounded-full': type === 'circle',
      },
      className,
    )}
    style={{ width, height }}
  />
);
